const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtvbmF5IiwiaWQiOiI1ZjllMjZkM2M5ZDY0YTViMDY0MWRhZTAiLCJpYXQiOjE2MDQyMDU1MTd9.vuof6roXhTIvPAn_a6MQlhshuCei2TKVW_V9_ogBU8o'

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    console.log('cleared')
    const blogObj = helper.initialBlogs.map(blog => new Blog(blog))
    const promiseArr = blogObj.map(blog => {
      console.log('saved')
      return blog.save()
    })
    await Promise.all(promiseArr)
  })

  test('blogs are returned as json', async () => {
    console.log('entered test')
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  describe('verify that id is defined', () => {
    test('unique identifier is defined', async () => {
      const response = await api.get('/api/blogs')
      expect(response.body[0].id).toBeDefined()
    })
  })

  describe('addition of blogs', () => {
    test('succeeds with status code when a valid blog is added', async () => {
      const newBlog = {
        title: 'React patterns Modified',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
      }
      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
      const titles = blogsAtEnd.map(blog => blog.title)
      expect(titles).toContain('React patterns Modified')
    })

    test('like property is missing in req body', async () => {
      const newBlog = {
        title: 'React patterns Modified',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
      }
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
      const blogsAtEnd = await helper.blogsInDb()
      const likes = blogsAtEnd.map(blog => blog.likes)
      console.log(likes)
      expect(likes[4]).toBe(0)
    })

    test('fails with staus code 400 if title and url is missing', async () => {
      const newBlog = {
        author: 'Ko Nay',
        likes: 5000
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })
  })

  describe('deletion of blogs', () => {
    test('succeeds with stutus code 204 if data is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]
      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)
      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
    })
  })
  describe('updation of blog', () => {
    test('succeed with status code 200', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = {
        title: blogsAtStart[0].title,
        author: blogsAtStart[0].author,
        url: blogsAtStart[0].url,
        likes: 101
      }
      console.log(blogToUpdate)
      await api
        .put(`/api/blogs/${blogsAtStart[0].id}`)
        .send(blogToUpdate)
        .expect(200)
      const blogsAtEnd = await helper.blogsInDb()
      const updatedBlog = blogsAtEnd[0]
      console.log(updatedBlog)
      expect(updatedBlog.likes).toBe(101)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})
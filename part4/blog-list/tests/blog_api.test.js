const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

// beforeEach(async () => {
//   await Blog.deleteMany({})
//   console.log('cleared')
//   const blogObj = helper.initialBlogs.map(blog => new Blog(blog))
//   const promiseArr = blogObj.map(blog => {
//     blog.save()
//     console.log('saved')
//   })
//   await Promise.all(promiseArr)
// })

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

afterAll(() => {
  mongoose.connection.close()
})
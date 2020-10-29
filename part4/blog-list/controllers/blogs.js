const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  return res.json(blogs)
})

blogRouter.get('/:id', async(req, res) => {
  const blog = await Blog.findById(req.params.id)
  if (blog) {
    return res.json(blog)
  }else {
    return res.status(404).end()
  }
})

blogRouter.post('/', async (req, res) => {
  const body = req.body
  //const blog = new Blog(req.body)
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  })
  const savedBlog = await blog.save()
  res.status(201).json(savedBlog)
})

//update likes
blogRouter.put('/:id', async(req, res) => {
  const body = req.body
  const blogToUpdate = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blogToUpdate, { new: true })
  return res.json(updatedBlog)
})

//delete req
blogRouter.delete('/:id', async(req, res) => {
  await Blog.findByIdAndRemove(req.params.id)
  return res.status(204).end()
})

module.exports = blogRouter
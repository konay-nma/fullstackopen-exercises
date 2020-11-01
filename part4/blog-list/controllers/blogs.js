const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (req, res) => {
  console.log(req.token)
  const blogs = await Blog.find({}).populate('user', { name: 1, username: 1 })
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
  const token = req.token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if(!token || !decodedToken.id) {
    return res.status(401).json({
      error: 'token missing or invalid'
    })
  }
  const user = await User.findById(decodedToken.id)
  console.log(user)
  const blog = new Blog({
    ...req.body,
    likes: body.likes || 0,
    user: user._id
  })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
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
  const token = req.token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  const blog = await Blog.findById(req.params.id)
  if (!token || !decodedToken.id || !blog || blog.user.toString() !== decodedToken.id) {
    return res.status(401).json({
      error: 'missing token or invalid'
    })
  }
  await Blog.findByIdAndRemove(req.params.id)
  return res.status(204).end()
})

module.exports = blogRouter
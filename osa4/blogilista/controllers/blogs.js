const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/api/blogs', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/api/blogs', async (request, response) => {
  const blog = new Blog({likes: request.body.likes || 0, ...request.body})
  const result = await blog.save()
  response.status(201).json(result)
})

blogsRouter.delete('/api/blogs/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter
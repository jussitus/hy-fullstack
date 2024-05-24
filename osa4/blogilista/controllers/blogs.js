const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  if (!request.user.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(request.user.id)

  const blog = new Blog({ likes: request.body.likes || 0, user: user.id, ...request.body })
  const result = await blog.save()
  const populated = await Blog.findById(result.id).populate('user', { username: 1, name: 1, id: 1 })
  user.blogs = user.blogs.concat(result.id)
  await user.save()
  response.status(201).json(populated)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const blogToDelete = await Blog.findOne({ _id: request.params.id })
  if (!blogToDelete) {
    return response.status(204).end()
  }
  if (request.user.id.toString() !== blogToDelete.user.toString()) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const result = await Blog.findByIdAndDelete(request.params.id).populate('user', { username: 1, name: 1 , id: 1 })
  response.status(204).json(result)
})

blogsRouter.put('/:id', async (request, response) => {
  const blogToUpdate = await Blog.findOne({ _id: request.params.id })
  if (!blogToUpdate) {
    return response.status(204).end()
  }

  const blog = {
    author: request.body.author,
    title: request.body.title,
    url: request.body.url,
    likes: request.body.likes
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true }).populate('user', { username: 1, name: 1, id: 1 })
  response.json(updatedBlog)
})



module.exports = blogsRouter



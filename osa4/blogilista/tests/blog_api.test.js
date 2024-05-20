const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const test_data = require('./test_data')


beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(test_data.manyBlogs)
})


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('correct number of blogs', async () => {
  const blogs = await api.get('/api/blogs')
  assert.strictEqual(blogs.body.length, 6)
})

test('blog id property named correctly', async () => {
  const blogs = await api.get('/api/blogs')
  assert(Object.hasOwn(blogs.body[0], 'id'))
})

test('adding new blog', async () => {
  const newBlog = { author: 'author1', title: 'title1', url: 'url1', likes: 100 }
  await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/)
  const blogs = (await api.get('/api/blogs')).body
  assert.strictEqual(blogs.length, 7)
  assert(blogs.some(blog => {
    return Object.values(newBlog).every(property => {
      return Object.values(blog).includes(property)
    })
  }))
})

test('adding new blog wihout likes property sets likes at 0', async () => {
  const newBlog = { author: 'author1', title: 'title1', url: 'url1' }
  const response = await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/)
  assert.strictEqual(response.body.likes, 0)
})

test('adding new blog without title or url results in 400', async () => {
  const withoutUrl = { author: 'author1', title: 'title1', likes: 100}
  const withoutTitle = { author: 'author1', url: 'url1', likes: 100 }
  await api.post('/api/blogs').send(withoutUrl).expect(400)
  await api.post('/api/blogs').send(withoutTitle).expect(400)
 
})

after(async () => {
  await mongoose.connection.close()
})
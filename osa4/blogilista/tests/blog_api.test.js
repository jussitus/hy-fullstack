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

after(async () => {
  await mongoose.connection.close()
})
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const test_data = require('./test_data')

let token = ''
beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const user = { username: 'root', name: 'John Smith', password: 'password1' }
  await api.post('/api/users').send(user)
  const auth = await api
    .post('/api/login')
    .send({ username: 'root', password: 'password1' })
  token = auth.body.token
  for (let blog of test_data.manyBlogs) {
    await api
      .post('/api/blogs')
      .send({
        author: blog.author,
        title: blog.title,
        url: blog.url,
        likes: blog.likes,
      })
      .set('Authorization', 'Bearer ' + token)
  }
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
  const newBlog = {
    author: 'author1',
    title: 'title1',
    url: 'url1',
    likes: 100,
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', 'Bearer ' + token)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  const blogs = (await api.get('/api/blogs')).body
  assert.strictEqual(blogs.length, 7)
  assert(
    blogs.some((blog) => {
      return Object.values(newBlog).every((property) => {
        return Object.values(blog).includes(property)
      })
    }),
  )
})

test('adding new blog wihout likes property sets likes at 0', async () => {
  const newBlog = { author: 'author1', title: 'title1', url: 'url1' }
  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', 'Bearer ' + token)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  assert.strictEqual(response.body.likes, 0)
})

test('adding new blog without title or url results in 400', async () => {
  const withoutUrl = { author: 'author1', title: 'title1', likes: 100 }
  const withoutTitle = { author: 'author1', url: 'url1', likes: 100 }
  await api
    .post('/api/blogs')
    .set('Authorization', 'Bearer ' + token)
    .send(withoutUrl)
    .expect(400)
  await api
    .post('/api/blogs')
    .set('Authorization', 'Bearer ' + token)
    .send(withoutTitle)
    .expect(400)
})

test('deleting a blog', async () => {
  const idToDelete = (await api.get('/api/blogs')).body[0].id
  await api
    .delete(`/api/blogs/${idToDelete}`)
    .set('Authorization', 'Bearer ' + token)
    .expect(204)
  const blogs = (await api.get('/api/blogs')).body
  assert(blogs.every((blog) => blog.id !== idToDelete))
})

test('deleting a nonexistent blog', async () => {
  const idToDelete = (await api.get('/api/blogs')).body[0].id
  await api
    .delete(`/api/blogs/${idToDelete}`)
    .set('Authorization', 'Bearer ' + token)
  const afterOneDelete = (await api.get('/api/blogs')).body
  assert.strictEqual(afterOneDelete.length, 5)
  await api
    .delete(`/api/blogs/${idToDelete}`)
    .set('Authorization', 'Bearer ' + token)
    .expect(204)
  const afterTwoDeletes = (await api.get('/api/blogs')).body
  assert.strictEqual(afterTwoDeletes.length, 5)
})

test('updating a blog', async () => {
  const blogToUpdate = (await api.get('/api/blogs')).body[0]
  blogToUpdate.likes = 100
  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(blogToUpdate)
    .set('Authorization', 'Bearer ' + token)
    .expect(200)
  const blogs = (await api.get('/api/blogs')).body
  assert(
    blogs.some((blog) => blog.id === blogToUpdate.id && blog.likes === 100),
  )
})

test('updating a nonexistent blog', async () => {
  const blogToUpdate = (await api.get('/api/blogs')).body[0]
  blogToUpdate.likes = 100
  await api
    .delete(`/api/blogs/${blogToUpdate.id}`)
    .set('Authorization', 'Bearer ' + token)
  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(blogToUpdate)
    .set('Authorization', 'Bearer ' + token)
  const blogs = (await api.get('/api/blogs')).body
  assert(blogs.every((blog) => blog.likes !== 100))
})

test('adding a blog without token', async () => {
  const newBlog = {
    author: 'author1',
    title: 'title1',
    url: 'url1',
    likes: 100,
  }
  await api.post('/api/blogs').send(newBlog).expect(401)
})

after(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  await mongoose.connection.close()
})

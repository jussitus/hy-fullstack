const { test, describe, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const bcrypt = require('bcrypt')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const test_utils = require('./test_utils.js')

beforeEach(async () => {
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('password', 10)
  const user = new User({ username: 'root', passwordHash })

  await user.save()
})

describe('user creation', async () => {
  test('creating a valid user', async () => {
    const initialUsers = await test_utils.usersInDb()
    const user = { username: 'xyz', name: 'Albert Einstein', password: 'password1' }
    await api.post('/api/users').send(user).expect(201)

    const usersInDb = await test_utils.usersInDb()
    assert.strictEqual(usersInDb.length, initialUsers.length + 1)
    const usernames = usersInDb.map(u => u.username)
    assert(usernames.includes(user.username))
  })
  test('creating invalid users', async () => {
    const withoutUsername = { name: 'Albert Einstein', password: 'password1' }
    const withoutPassword = { username: 'xyz', name: 'Albert Einstein' }
    const invalidUsername = { username: 'xy', name: 'Albert Einstein', password: 'password1' }
    const invalidPassword = { username: 'xyz', name: 'Albert Einstein', password: 'pa' }
    for (const user in [withoutUsername, withoutPassword, invalidUsername, invalidPassword]) {
      const result = await api.post('/api/users').send(user).expect(400)
      assert(result.body.error.includes('username and password must be at least 3 characters long'))

    }

  })
})



after(async () => {
  await User.deleteMany({})
  await mongoose.connection.close()
})
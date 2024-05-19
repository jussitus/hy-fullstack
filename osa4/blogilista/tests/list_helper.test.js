const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const test_data = require('./test_data')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('totalLikes', () => {

  test('empty list returns zero', () => {
    assert.strictEqual(listHelper.totalLikes([]), 0)
  })
  test('list of one blog returns its likes', () => {
    assert.strictEqual(listHelper.totalLikes(test_data.one_blog), 10)
  })
  test('list of many blogs returns sum of their likes', () => {
    assert.strictEqual(listHelper.totalLikes(test_data.many_blogs), 36)
  })
})

describe('favoriteBlog', () => {
  test('empty list returns null', () => {
    assert.strictEqual(listHelper.favoriteBlog([]), null)
  })
  test('list of one blog return blog', () => {
    assert.strictEqual(listHelper.favoriteBlog(test_data.one_blog), test_data.one_blog[0])
  })
  test('list of many blogs returns one with most likes', () => {
    assert.strictEqual(listHelper.favoriteBlog(test_data.many_blogs), test_data.many_blogs[2])
  })
})

describe('mostBlogs', () => {
  test('empty list returns null', () => {
    assert.strictEqual(listHelper.mostBlogs([]), null)
  })
  test('list of one blogs returns author with one blog', () => {
    assert.deepStrictEqual(listHelper.mostBlogs(test_data.one_blog), { author: 'Example author', blogs: 1 })
  })
  test('list of many authors returns author with most blogs', () => {
    assert.deepStrictEqual(listHelper.mostBlogs(test_data.many_blogs), { author: 'Robert C. Martin', blogs: 3 })
  })
})
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
    assert.strictEqual(listHelper.totalLikes(test_data.oneBlog), 10)
  })
  test('list of many blogs returns sum of their likes', () => {
    assert.strictEqual(listHelper.totalLikes(test_data.manyBlogs), 36)
  })
})

describe('favoriteBlog', () => {
  test('empty list returns null', () => {
    assert.strictEqual(listHelper.favoriteBlog([]), null)
  })
  test('list of one blog return blog', () => {
    assert.strictEqual(
      listHelper.favoriteBlog(test_data.oneBlog),
      test_data.oneBlog[0],
    )
  })
  test('list of many blogs returns one with most likes', () => {
    assert.strictEqual(
      listHelper.favoriteBlog(test_data.manyBlogs),
      test_data.manyBlogs[2],
    )
  })
})

describe('mostBlogs', () => {
  test('empty list returns null', () => {
    assert.strictEqual(listHelper.mostBlogs([]), null)
  })
  test('list of one blog returns author', () => {
    assert.deepStrictEqual(listHelper.mostBlogs(test_data.oneBlog), {
      author: 'Example author',
      blogs: 1,
    })
  })
  test('list of many blogs returns author with most blogs', () => {
    assert.deepStrictEqual(listHelper.mostBlogs(test_data.manyBlogs), {
      author: 'Robert C. Martin',
      blogs: 3,
    })
  })
})

describe('mostLikes', () => {
  test('empty list returns null', () => {
    assert.strictEqual(listHelper.mostLikes([]), null)
  })
  test('list of one blog returns author', () => {
    assert.deepStrictEqual(listHelper.mostLikes(test_data.oneBlog), {
      author: 'Example author',
      likes: 10,
    })
  })
  test('list of many blogs returns author with most likes', () => {
    assert.deepStrictEqual(listHelper.mostLikes(test_data.manyBlogs), {
      author: 'Edsger W. Dijkstra',
      likes: 17,
    })
  })
})

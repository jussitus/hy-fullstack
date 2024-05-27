const lodash = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((a, blog) => a + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  return blogs.reduce((max, blog) => (blog.likes >= max.likes ? blog : max))
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  const blogs_by_author = lodash.groupBy(blogs, 'author')
  const max_author = lodash.maxBy(lodash.values(blogs_by_author), 'length')
  return { author: max_author[0].author, blogs: max_author.length }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  const blogs_by_author = lodash.groupBy(blogs, 'author')
  const max_author = lodash.maxBy(lodash.values(blogs_by_author), (x) =>
    lodash.sumBy(x, 'likes'),
  )
  return {
    author: max_author[0].author,
    likes: lodash.sumBy(max_author, 'likes'),
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}

import { useState } from 'react'
import { removeBlog, likeBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Blog = ({ blog }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const style = {
    border: 'solid',
    borderWidth: 1,
    padding: 5,
    margin: 5,
  }

  const handleLike = async (event) => {
    event.preventDefault()
    dispatch(likeBlog(blog))
  }

  const handleRemove = async (event) => {
    event.preventDefault()
    if (window.confirm(`Really remove ${blog.title} by ${blog.author}?`))
      dispatch(removeBlog(blog))
    navigate('/blogs')
  }

  if (!blog) {
    return <div>Loading blog...</div>
  }

  return (
    <div data-testid="blog-view-expanded" style={style}>
      <div>{blog.title}</div>
      <div>url: {blog.url}</div>
      <div>
        likes: {blog.likes}
        <button type="button" onClick={handleLike}>
          like
        </button>
      </div>
      <div>author: {blog.author}</div>
      <div>
        {user && user.id === blog.user.id ? (
          <button type="button" onClick={handleRemove}>
            remove
          </button>
        ) : null}
      </div>
    </div>
  )
}

export default Blog

import { useState } from 'react'
import { removeBlog, likeBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()
  const [shown, setShown] = useState(false)
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
  }
  return shown ? (
    <div data-testid="blog-view-expanded" style={style}>
      <div>
        {blog.title}
        <button type="button" onClick={() => setShown(false)}>
          hide
        </button>
      </div>
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
  ) : (
    <div data-testid="blog-view-default" style={style}>
      {blog.title} by {blog.author}
      <button type="button" onClick={() => setShown(true)}>
        view
      </button>
    </div>
  )
}

export default Blog

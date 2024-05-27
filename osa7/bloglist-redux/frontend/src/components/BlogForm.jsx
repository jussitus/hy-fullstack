import { useState } from 'react'
import { createBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
const BlogForm = () => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })
  const [shown, setShown] = useState(false)

  const handleBlogChange = async (event) => {
    const changedBlog = { ...newBlog }
    changedBlog[event.target.name] = event.target.value
    setNewBlog(changedBlog)
  }
  const dispatch = useDispatch()
  const addBlog = (event) => {
    event.preventDefault()
    dispatch(createBlog({ ...newBlog }))
    setNewBlog({ title: '', author: '', url: '' })
  }
  return shown ? (
    <form onSubmit={addBlog}>
      <div>
        title
        <input
          data-testid="title"
          name="title"
          id="title-input"
          value={newBlog.title}
          onChange={handleBlogChange}
        />
      </div>
      <div>
        author
        <input
          data-testid="author"
          name="author"
          id="author-input"
          value={newBlog.author}
          onChange={handleBlogChange}
        />
      </div>
      <div>
        url
        <input
          data-testid="url"
          name="url"
          id="url-input"
          value={newBlog.url}
          onChange={handleBlogChange}
        />
      </div>
      <input type="hidden" name="blog" value={newBlog} />
      <button type="submit" id="save-button">
        save
      </button>
      <button type="button" onClick={() => setShown(false)}>
        cancel
      </button>
    </form>
  ) : (
    <button type="button" onClick={() => setShown(true)}>
      new blog
    </button>
  )
}

export default BlogForm

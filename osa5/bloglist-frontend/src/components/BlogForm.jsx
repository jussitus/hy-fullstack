import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })
  const [shown, setShown] = useState(false)

  const handleBlogChange = async (event) => {
    const changedBlog = { ...newBlog }
    changedBlog[event.target.name] = event.target.value
    setNewBlog(changedBlog)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({ ...newBlog })
    setNewBlog({ title: '', author: '', url: '' })
  }
  return shown ? (
    <form onSubmit={addBlog}>
      <div>title
        <input
          name='title'
          value={newBlog.title}
          onChange={handleBlogChange}
        />
      </div>
      <div>author
        <input
          name='author'
          value={newBlog.author}
          onChange={handleBlogChange}
        />
      </div>
      <div>url
        <input
          name='url'
          value={newBlog.url}
          onChange={handleBlogChange}
        />
      </div>
      <input type="hidden" name="blog" value={newBlog}/>
      <button type="submit">save</button>
      <button type="button" onClick={() => setShown(false)}>cancel</button>
    </form>
  )
    : (<button type="button" onClick={() => setShown(true)}>new blog</button>

    )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}
export default BlogForm
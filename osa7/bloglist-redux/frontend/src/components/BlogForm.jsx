import { useState } from 'react'
import { createBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { TextField, Button, Input, Stack } from '@mui/material'
const BlogForm = () => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })
  const [shown, setShown] = useState(false)

  const handleBlogChange = async (event) => {
    const changedBlog = { ...newBlog }
    changedBlog[event.target.name] = event.target.value
    setNewBlog(changedBlog)
  }
  const dispatch = useDispatch()
  const handleAddBlog = (event) => {
    event.preventDefault()
    dispatch(createBlog({ ...newBlog }))
    setNewBlog({ title: '', author: '', url: '' })
  }
  return shown ? (
    <form onSubmit={handleAddBlog}>
      <Stack spacing={2} width={250}>
        <TextField
          data-testid="title"
          name="title"
          label="Title"
          id="title-input"
          value={newBlog.title}
          onChange={handleBlogChange}
        />
        <TextField
          data-testid="author"
          name="author"
          label="Author"
          id="author-input"
          value={newBlog.author}
          onChange={handleBlogChange}
        />
        <TextField
          data-testid="url"
          name="url"
          label="URL"
          id="url-input"
          value={newBlog.url}
          onChange={handleBlogChange}
        />
      </Stack>
      <Input type="hidden" name="blog" value={newBlog} />
      <Stack spacing={2} direction="row">
        <Button
          mr={1}
          variant="contained"
          color="primary"
          type="submit"
          id="save-button"
        >
          save
        </Button>
        <Button
          variant="contained"
          color="primary"
          type="button"
          onClick={() => setShown(false)}
        >
          cancel
        </Button>
      </Stack>
    </form>
  ) : (
    <Button
      type="button"
      variant="contained"
      color="primary"
      onClick={() => setShown(true)}
    >
      new blog
    </Button>
  )
}

export default BlogForm

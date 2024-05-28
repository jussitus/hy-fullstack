import { useState } from 'react'
import { removeBlog, likeBlog, commentBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { List, ListItem, Button, Stack, TextField } from '@mui/material'

const Blog = ({ blog }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const [comment, setComment] = useState('')

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

  const handleComment = async (event) => {
    event.preventDefault()
    dispatch(commentBlog(blog, comment))
  }
  if (!blog) {
    return <div>Loading blog...</div>
  }

  return (
    <div>
      <List>
        <ListItem>{blog.title}</ListItem>
        <ListItem>{blog.url}</ListItem>
        <ListItem>liked by {blog.likes}</ListItem>
        <ListItem>by {blog.author}</ListItem>
        <ListItem>added by {blog.user.name}</ListItem>
        <ListItem>
          <Stack direction="row" spacing={2}>
            <Button
              color="primary"
              variant="contained"
              type="button"
              onClick={handleLike}
            >
              like
            </Button>
            {user && user.id === blog.user.id && (
              <Button
                color="primary"
                variant="contained"
                type="button"
                onClick={handleRemove}
              >
                remove
              </Button>
            )}
          </Stack>
        </ListItem>
        <ListItem>
          <form onSubmit={handleComment}>
            <TextField
              type="text"
              value={comment}
              onChange={({ target }) => setComment(target.value)}
            />
            <Button color="primary" variant="contained" type="submit">
              comment
            </Button>
          </form>
        </ListItem>
      </List>
      <List>
        <h2>Comments</h2>
        {blog.comments.map((comment) => (
          <ListItem>{comment}</ListItem>
        ))}
      </List>
    </div>
  )
}

export default Blog

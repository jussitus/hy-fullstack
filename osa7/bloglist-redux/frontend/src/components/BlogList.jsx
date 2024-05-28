import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import BlogForm from './BlogForm'
import { List, ListItem } from '@mui/material'
const BlogList = () => {
  const blogs = useSelector((state) =>
    state.blogs.toSorted((a, b) => b.likes - a.likes),
  )
  const user = useSelector((state) => state.user)
  return (
    <div>
      <h2>Blogs</h2>
      {user && <BlogForm />}
      <List>
        {blogs.map((blog) => (
          <ListItem key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title} </Link>
            <div style={{ padding: '1em' }}>{blog.likes} likes</div>
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default BlogList

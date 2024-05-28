import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import BlogForm from './BlogForm'
const BlogList = () => {
  const blogs = useSelector((state) =>
    state.blogs.toSorted((a, b) => b.likes - a.likes),
  )
  return (
    <div>
      <h2>Blogs</h2>
      <BlogForm />
      {blogs.map((blog) => (
        <div key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link> ({blog.likes}{' '}
          likes)
        </div>
      ))}
    </div>
  )
}

export default BlogList

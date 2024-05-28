import { Link } from 'react-router-dom'
const User = ({ user }) => {
  if (!user) return null
  return (
    <div>
      <h2>{user.name}</h2>
      {user.blogs.length > 0 ? (
        <h3>Added blogs</h3>
      ) : (
        <div>{user.name} has not added any blogs.</div>
      )}
      {user.blogs.map((blog) => (
        <div key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      ))}
    </div>
  )
}

export default User

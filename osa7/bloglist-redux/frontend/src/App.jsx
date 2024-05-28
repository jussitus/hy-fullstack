import { useEffect } from 'react'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import { useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userListReducer'
import { loginLocalStorage, logout } from './reducers/userReducer'
import { useSelector } from 'react-redux'
import { Routes, Route, Link, useMatch } from 'react-router-dom'
import Blog from './components/Blog'
import Users from './components/Users'
import User from './components/User'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(loginLocalStorage(user))
    }
  }, [dispatch])

  const user = useSelector((state) => state.user)
  const users = useSelector((state) => state.users)
  const blogs = useSelector((state) =>
    state.blogs.toSorted((a, b) => b.likes - a.likes),
  )
  const userMatch = useMatch('/users/:id')
  const userById = userMatch
    ? users.find((blog) => blog.id === userMatch.params.id)
    : null
  const blogMatch = useMatch('/blogs/:id')
  const blogbyId = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null

  return (
    <div>
      <div>
        <Link to="/blogs">blogs</Link>
        <Link to="/users">users</Link>
        {user ? (
          <>
            {user.username} logged in
            <button onClick={() => dispatch(logout())}>logout</button>
          </>
        ) : (
          <Link to="/login">login</Link>
        )}
      </div>

      <Notification />

      <Routes>
        <Route path="/blogs/:id" element={<Blog blog={blogbyId} />} />
        <Route path="/users/:id" element={<User user={userById} />} />
        <Route path="/" element={<BlogList />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/users" element={<Users />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </div>
  )
}

export default App

import { useEffect } from 'react'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import { useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { loginLocalStorage, logout } from './reducers/userReducer'
import { useSelector } from 'react-redux'
const App = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(loginLocalStorage(user))
    }
  }, [dispatch])

  return (
    <div>
      <Notification />

      {!user && <LoginForm />}

      {user && (
        <div>
          <div>
            {user.name} has logged in
            <button onClick={() => dispatch(logout())}>logout</button>
          </div>
          <BlogForm user={user} />
        </div>
      )}
      <h2>blogs</h2>
      <BlogList />
    </div>
  )
}

export default App

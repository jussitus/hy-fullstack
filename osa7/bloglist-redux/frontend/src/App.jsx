import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import { setNotification } from './reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()
  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.toSorted((a, b) => b.likes - a.likes)))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception.message)
      dispatch(
        setNotification({
          message: 'wrong credentials',
          error: true,
        }),
      )
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser', JSON.stringify(user))
    setUser(null)
  }

  const createBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      dispatch(
        setNotification({
          message: `New blog added: ${returnedBlog.title} by ${returnedBlog.author}`,
          error: false,
        }),
      )
    } catch (exception) {
      console.log(exception.message)
      dispatch(
        setNotification({
          message: 'Title, author or url missing',
          error: true,
        }),
      )
    }
  }

  const updateBlog = async (blogObject) => {
    const returnedBlog = await blogService.update(blogObject)
    const updatedBlogs = [...blogs]
    const index = updatedBlogs.findIndex((blog) => blog.id === returnedBlog.id)
    updatedBlogs[index] = returnedBlog
    setBlogs(updatedBlogs.toSorted((a, b) => b.likes - a.likes))
  }

  const removeBlog = async (blogObject) => {
    await blogService.remove(blogObject)
    const removedBlogs = [...blogs].filter((x) => x.id !== blogObject.id)
    setBlogs(removedBlogs)
  }
  return (
    <div>
      <Notification />

      {!user && (
        <LoginForm
          username={username}
          password={password}
          handleLogin={handleLogin}
          setUsername={setUsername}
          setPassword={setPassword}
        ></LoginForm>
      )}

      {user && (
        <div>
          <div>
            {user.name} has logged in
            <button onClick={handleLogout}>logout</button>
          </div>
          <BlogForm createBlog={createBlog} />
        </div>
      )}
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          removeBlog={removeBlog}
          user={user}
        />
      ))}
    </div>
  )
}

export default App

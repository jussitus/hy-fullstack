import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: ''})
  const [message, setMessage] = useState('')
  const [error, setError] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
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
        username, password,
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
      setMessage('wrong credentials')
      setError(true)
      setTimeout(() => {
        setMessage(null)
        setError(false)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser', JSON.stringify(user))
    setUser(null)
  }

  const handleBlogChange = async (event)=> {
    const changedBlog = {...newBlog}
    changedBlog[event.target.name] = event.target.value
    setNewBlog(changedBlog)
  }
  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      ...newBlog
    }
    console.log(blogObject)
    const returnedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(returnedBlog))
    setNewBlog({ title: '', author: '', url: ''})
    setMessage(`New blog added: ${returnedBlog.title} by ${returnedBlog.author}`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)

  }

  return (
    <div>
      <Notification message={message} error={error} />

      {!user && LoginForm(username, password, handleLogin, setUsername, setPassword)}

      {user &&
        <div>
          {user.name} has logged in <button onClick={handleLogout}>logout</button>
          <BlogForm addBlog={addBlog} newBlog={newBlog} handleBlogChange={handleBlogChange}/>
          <h2>blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>}
    </div>
  )
}

export default App
import { useMutation, useQuery } from '@apollo/client'
import { LOGIN, ME } from '../queries'
import { useState, useEffect } from 'react'
const LoginForm = ({ show, setToken, setPage, setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN)

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('user-token', token)
      setPage('books')
    }
  }, [result.data])

  const tempUser = useQuery(ME, { skip: !result.data })
  if (tempUser.data) {
    setUser(tempUser.data.me)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    login({ variables: { username, password } })
  }

  if (!show) {
    return null
  }
  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <label>username</label>
          <input
            type="text"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <label>password</label>
          <input
            type="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm

import { login } from '../reducers/userReducer'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { TextField, Button, Box } from '@mui/material'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(login(username, password))
    navigate('/blogs')
  }

  return (
    <form onSubmit={handleLogin}>
      <h1>Login</h1>
      <div>
        <Box pb={2}>
          <TextField
            data-testid="username"
            type="text"
            value={username}
            label="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </Box>
      </div>
      <div>
        <Box pb={2}>
          <TextField
            data-testid="password"
            type="password"
            value={password}
            label="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </Box>
      </div>

      <Button variant="contained" color="primary" type="submit">
        login
      </Button>
    </form>
  )
}

export default LoginForm

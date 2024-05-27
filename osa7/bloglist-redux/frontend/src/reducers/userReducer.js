import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import { userToAPI } from '../services/blogs'
import { setNotification } from './notificationReducer'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      userToAPI(action.payload)
      return action.payload
    },
  },
})

const { setUser } = userSlice.actions

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      dispatch(setUser(user))
    } catch (exception) {
      console.log(exception.message, exception.name)
      dispatch(
        setNotification({
          message: 'wrong credentials',
          error: true,
        }),
      )
    }
  }
}

export const loginLocalStorage = (user) => {
  return async (dispatch) => {
    dispatch(setUser(user))
  }
}

export const logout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedUser')
    dispatch(setUser(null))
  }
}

export default userSlice.reducer

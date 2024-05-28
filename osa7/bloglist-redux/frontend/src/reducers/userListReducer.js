import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const userListSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
    updateUser(state, action) {
      state
        .find((u) => u.id == action.payload.user.id)
        .blogs.push(action.payload)
    },
  },
})

const { setUsers, updateUser } = userListSlice.actions

export const initializeUsers = () => {
  return async (dispatch) => {
    const blogs = await userService.getAll()
    dispatch(setUsers(blogs))
  }
}

export const addBlogToUser = (blog) => {
  return async (dispatch) => {
    dispatch(updateUser(blog))
  }
}

export default userListSlice.reducer

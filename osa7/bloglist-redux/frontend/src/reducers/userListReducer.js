import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const userListSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
  },
})

const { setUsers } = userListSlice.actions

export const initializeUsers = () => {
  return async (dispatch) => {
    const blogs = await userService.getAll()
    dispatch(setUsers(blogs))
  }
}

export default userListSlice.reducer

import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { message: null, error: false, timeoutId: null },
  reducers: {
    setMessage(state, action) {
      return {
        ...state,
        message: action.payload.message,
        error: action.payload.error,
      }
    },
    setTimeoutId(state, action) {
      clearTimeout(state.timeoutId)
      return { ...state, timeoutId: action.payload }
    },
  },
})

const { setMessage, setTimeoutId } = notificationSlice.actions

export const setNotification = (notification) => {
  return async (dispatch) => {
    dispatch(setMessage(notification))
    const timeoutId = setTimeout(() => {
      dispatch(setMessage({ message: null, error: false }))
    }, 5000)
    dispatch(setTimeoutId(timeoutId))
  }
}

export default notificationSlice.reducer

import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: { message: "", timeoutId: null },
  reducers: {
    setMessage(state, action) {
      return { ...state, message: action.payload };
    },
    clearMessage(state, action) {
      return { ...state, message: ""};
    },
    setTimeoutId(state, action) {
      clearTimeout(state.timeoutId)
      return { ...state, timeoutId: action.payload };
    },
  },
});

const { setMessage, clearMessage, setTimeoutId } =
  notificationSlice.actions;

export const setNotification = (message, seconds) => {
  return async (dispatch) => {
    dispatch(setMessage(message));
    const timeoutId = setTimeout(() => {
      dispatch(clearMessage());
    }, seconds * 1000);
    dispatch(setTimeoutId(timeoutId));
  }
}
export default notificationSlice.reducer;

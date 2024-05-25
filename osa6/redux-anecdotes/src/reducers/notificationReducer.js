import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: { message: "", timeoutId: null },
  reducers: {
    setNotification(state, action) {
      return { ...state, message: action.payload };
    },
    clearNotification(state, action) {
      return { ...state, message: ""};
    },
    setTimeoutId(state, action) {
      clearTimeout(state.timeoutId)
      return { ...state, timeoutId: action.payload };
    },
  },
});

export const { setNotification, clearNotification, setTimeoutId } =
  notificationSlice.actions;
export default notificationSlice.reducer;

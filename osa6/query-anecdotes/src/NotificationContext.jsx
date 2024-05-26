import { createContext, useReducer } from "react";

let timeoutId;
const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      clearTimeout(timeoutId);
      return action.payload;
    case "CLEAR_NOTIFICATION":
      return "";
    case "SET_TIMEOUT_ID":
      timeoutId = action.payload 
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ""
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};


export default NotificationContext
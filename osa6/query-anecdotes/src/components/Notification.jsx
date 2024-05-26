import { useContext } from "react";
import NotificationContext from "../NotificationContext";
const Notification = () => {
  
  const message = useContext(NotificationContext)[0]
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    display: message ? "initial" : "none"
  }

  
  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification

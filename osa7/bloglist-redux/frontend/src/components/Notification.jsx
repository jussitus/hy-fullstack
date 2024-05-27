import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  if (notification === null) {
    return null
  }

  const style = {
    fontSize: 'large',
    color: notification.error ? 'red' : 'green',
  }

  return <div style={style}>{notification.message}</div>
}

export default Notification

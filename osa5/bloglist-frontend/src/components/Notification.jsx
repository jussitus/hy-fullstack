const Notification = ({ message, error }) => {
  if (message === null) {
    return null;
  }

  const style = {
    fontSize: "large",
    color: error ? "red" : "green",
  };

  return <div style={style}>{message}</div>;
};

export default Notification;

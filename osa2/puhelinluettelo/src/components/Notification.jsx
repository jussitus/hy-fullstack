export const Notification = ({ message, error }) => {
  let style = {
    fontSize: '1.5em',
    border: 'solid',
    padding: '0.25em',
    marginBottom: '1em',
  };
  style.color = error ? 'red' : 'green';

  if (message === null) {
    return null;
  }
  return (
    <div style={style}>{message}</div>
  )
}

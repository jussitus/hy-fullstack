import { useDispatch } from "react-redux";
import { create } from "../reducers/anecdoteReducer";
import {
  setNotification,
  clearNotification,
  setTimeoutId,
} from "../reducers/notificationReducer";
const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(create(content));
    dispatch(
      setNotification({ message: `you created "${content}"` })
    );
    const timeoutId = setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
    dispatch(setTimeoutId(timeoutId));
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm;
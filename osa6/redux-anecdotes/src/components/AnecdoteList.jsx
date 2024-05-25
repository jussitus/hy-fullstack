import { useDispatch, useSelector } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import {
  setNotification,
  clearNotification,
  setTimeoutId,
} from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const sortedAnecdotes = useSelector((state) =>
    state.anecdotes
      .toSorted((a, b) => b.votes - a.votes)
      .filter((anecdote) =>
        anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
      )
  );
  const voteAnecdote = (anecdote) => {
    dispatch(vote(anecdote.id));
    dispatch(
      setNotification({ message: `you voted for "${anecdote.content}"` })
    );
    const timeoutId = setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
    dispatch(setTimeoutId(timeoutId));
  };
  return (
    <div>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteAnecdote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;

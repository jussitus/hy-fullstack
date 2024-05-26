import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdote } from "../services/anecdoteService";
import NotificationContext from "../NotificationContext";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const dispatch = useContext(NotificationContext)[1]
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote));
      dispatch({type: "SET_NOTIFICATION", payload: `created anecdote: "${newAnecdote.content}"`})
      const timeoutId = setTimeout(() => {
        dispatch({type: "CLEAR_NOTIFICATION"})
      }, 5000)
      dispatch({type: "SET_TIMEOUT_ID", payload: timeoutId})
    },
    onError: (error) => {
      dispatch({type: "SET_NOTIFICATION", payload: error.name === "AxiosError" ? "anecdote must be at least 5 characters in length" : error.message})
      const timeoutId = setTimeout(() => {
        dispatch({type: "CLEAR_NOTIFICATION"})
      }, 5000)
      dispatch({type: "SET_TIMEOUT_ID", payload: timeoutId})
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newAnecdoteMutation.mutate({ content, votes: 0 });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;

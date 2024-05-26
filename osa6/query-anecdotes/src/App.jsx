import { useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAnecdotes, updateAnecdote } from "./services/anecdoteService";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import NotificationContext from "./NotificationContext";

const App = () => {
  const dispatch = useContext(NotificationContext)[1]
  const queryClient = useQueryClient()
  const voteAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["anecdotes"]})
    },
    onError: () => {console.log("error")}
  })
  const handleVote = (anecdote) => {
    const updatedAnecdote = {...anecdote, votes: anecdote.votes + 1}
    voteAnecdoteMutation.mutate(updatedAnecdote)
    dispatch({type: "SET_NOTIFICATION", payload: `voted for anecdote: "${updatedAnecdote.content}"`})
    const timeoutId = setTimeout(() => {
      dispatch({type: "CLEAR_NOTIFICATION"})
    }, 5000)
    dispatch({type: "SET_TIMEOUT_ID", payload: timeoutId})
    
  };

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: 1,
    refetchOnWindowFocus: false
  });

  if (result.isLoading) {
    return <div>Loading anecdotes...</div>;
  }

  if (result.isError) {
    return <div>couldn't load anecdotes, server problems</div>;
  }
  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;

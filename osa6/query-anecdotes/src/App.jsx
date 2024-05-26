import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAnecdotes, updateAnecdote } from "./services/anecdoteService";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";

const App = () => {
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
  };

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: 1,
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

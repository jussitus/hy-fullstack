import { useState } from 'react'


const Button = ({ handleClick, text }) => {
  return (
    <>
      <button onClick={handleClick}>{text}</button>
    </>
  )

}

const Anecdote = ({ anecdote, votes }) => {
  return (
    <>
      {anecdote}<br />
      has {votes} votes
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))
  const setRandomAnecdote = () => setSelected(Math.floor(Math.random() * anecdotes.length))
  const incrementPoints = (anecdote) => {
    const copy = [...points]
    copy[anecdote] += 1
    return () => setPoints(copy)
  }
  console.log(points)
  return (
    <div>
      <h2>Anecdote of the day</h2>
      <Anecdote anecdote={anecdotes[selected]} votes={points[selected]} />
      <div>
        <Button handleClick={setRandomAnecdote} text='next anecdote' />
        <Button handleClick={incrementPoints(selected)} text='vote' />
      </div>
      <h2>Anecdote with most votes</h2>
      <Anecdote anecdote={anecdotes[points.indexOf(Math.max(...points))]} votes={Math.max(...points)} />
    </div>
  )

}

export default App
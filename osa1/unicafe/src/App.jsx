import { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>)
}

const StatisticLine = ({ text, good, neutral, bad }) => {
  switch (text) {
    case 'average':
      return (
        <tr>
          <td>average</td>
          <td>{((good * 1 + neutral * 0 + bad * (-1)) / (good + neutral + bad)).toFixed(1)}</td>
        </tr>
      )
    case 'positive':
      return (
        <tr>
          <td>positive</td>
          <td>{(100 * good / (good + neutral + bad)).toFixed(1)} %</td>
        </tr>
      )
    default:
      return (
        <tr>
          <td>{text}</td>
          <td>{good + neutral + bad}</td>
        </tr>
      )
  }
}

const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad == 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <table>
      <tbody>
        <StatisticLine text='good' good={good} neutral={0} bad={0} />
        <StatisticLine text='neutral' good={0} neutral={neutral} bad={0} />
        <StatisticLine text='bad' good={0} neutral={0} bad={bad} />
        <StatisticLine text='all' good={good} neutral={neutral} bad={bad} />
        <StatisticLine text='average' good={good} neutral={neutral} bad={bad} />
        <StatisticLine text='positive' good={good} neutral={neutral} bad={bad} />
      </tbody>
    </table>
  )


}
const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <div>
        <Button handleClick={() => setGood(good + 1)} text='good' />
        <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
        <Button handleClick={() => setBad(bad + 1)} text='bad' />
      </div>
      <h1>Statistics</h1>
      <div>
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    </div>
  )
}

export default App
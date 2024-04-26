import { useState } from 'react'

function Button({ text, onClick }) {
  return <button onClick={onClick}>{text}</button>
}

function StatisticLine({ text, value }) {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

function Statistics({ good, neutral, bad }) {
  const total = good + neutral + bad

  if (total === 0) {
    return (
      <div>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }

  const average = (good - bad) / total
  const positive = good / total

  return (
    <div>
      <h1>Statistics</h1>
      <div>
        <table>
          <tbody>
            <StatisticLine text="Good" value={good} />
            <StatisticLine text="Neutral" value={neutral} />
            <StatisticLine text="Bad" value={bad} />
            <StatisticLine text="All" value={total} />
            <StatisticLine text="Average" value={average} />
            <StatisticLine text="Positive" value={`${positive * 100} %`} />
          </tbody>
        </table>
      </div>
    </div>
  )
}

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>Give feedback</h1>
      <div>
        <Button text="Good" onClick={handleGood} />
        <Button text="Neutral" onClick={handleNeutral} />
        <Button text="Bad" onClick={handleBad} />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App

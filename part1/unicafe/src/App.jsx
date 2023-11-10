import { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )  
}

const StatisticsLine = ({ stat, text }) => {
  return (
    <tr><td>{text}</td><td>{stat}</td></tr>
    // <p>{text}: {stat}</p>
  )
}
const Statistics = ({ stats }) => {
    if (stats.total > 0) {
      return (
        <div>
          <h1>Statistics</h1>
          <table>
            <tbody>
              <StatisticsLine text="good" stat={stats.good} />
              <StatisticsLine text="neutral" stat={stats.neutral} />
              <StatisticsLine text="bad" stat={stats.bad} />
              <StatisticsLine text="all" stat={stats.total} />
              <StatisticsLine text="average" stat={(stats.good - stats.bad) / stats.total} />
            </tbody> 
          </table>
        </div>
      )
    } else {
      return (
        <div><h2>No Feedback Given</h2></div>
      )
    }
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  let total = good + bad + neutral;
  const stats = {good: good, bad: bad, total: total, neutral: neutral}

  const handleGood = () => {
    setGood(good + 1);
  }

  const handleNeutral = () => setNeutral(neutral + 1);
  const handleBad = () => setBad(bad + 1);

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={handleGood} text='good' />
      <Button handleClick={handleNeutral} text='neutral' />
      <Button handleClick={handleBad} text='bad' />

      <Statistics stats={stats}/>
    </div>
  )
}

export default App
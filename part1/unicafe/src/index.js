import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistic = props => <tr><td>{props.text}</td><td>{props.value}</td></tr>

const Statistics = (props) => {
  if (props.all === 0) return <div>No feedback given</div>
  return (
    <div>
      <table>
        <tbody>
          <Statistic text="good" value={props.good} />
          <Statistic text="neutarl" value={props.neutral} />
          <Statistic text="bad" value={props.bad} />
          <Statistic text="all" value={props.all} />
          <Statistic text="average" value={props.average} />
          <Statistic text="positive" value={props.positive} />
        </tbody>
      </table>
    </div>
  )
}

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad

  const positive = all > 0 ? (100 * good) / all + " %" : 0 + " %"
  const average = all > 0 ? (good - bad) / all : 0;

  return (
    <div>
      <h2>give feedback</h2>
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
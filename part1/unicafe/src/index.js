import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistic = props => <div>
  <span>{props.text} {props.value}</span>
</div>

const Statistics = (props) => {
  if (props.all === 0) return <div>No feedback given</div>
  return (
    <div>
      <Statistic text="good" value={props.good} />
      <Statistic text="neutarl" value={props.neutral} />
      <Statistic text="bad" value={props.bad} />
      <Statistic text="all" value={props.all} />
      <Statistic text="average" value={props.average} />
      <Statistic text="positive" value={props.positive} />
    </div>
  )
}

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
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>natural</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = (props) => {
  if (props.all === 0 ) return <div>No feedback given</div>
  return (
    <div>
      <span>good {props.good} </span><br />
      <span>neutral {props.neutral} </span><br />
      <span>bad {props.bad}</span> <br />
      <span>all {props.all}</span> <br />
      <span>average {props.average} </span> <br />
      <span>positive {props.positive}</span>
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
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + neutral + bad
  const positive = all > 0 ? (100 * good) / all +" %" : 0+" %"
  const average = all > 0 ? (good - bad) / all : 0 ;
 

  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>natural</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <div>
        <h2>stastics</h2>
        <span>good {good} </span><br />
        <span>neutral {neutral} </span><br />
        <span>bad {bad}</span> <br />
        <span>all {all}</span> <br />
        <span>average {average} </span> <br/>
        <span>positive {positive}</span>
      </div>

    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
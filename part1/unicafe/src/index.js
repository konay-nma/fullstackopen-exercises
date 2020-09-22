import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>give feedback</h2>
      <button onClick = {()=> setGood(good+1)}>good</button>
      <button onClick = {()=> setNeutral(neutral+1)}>natural</button>
      <button onClick = {()=> setBad(bad+1)}>bad</button>
      <div>
        <h2>stastics</h2>
        <span>good {good} </span><br/>
        <span>neutral {neutral} </span><br/>
        <span>bad {bad}</span>
      </div>

    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
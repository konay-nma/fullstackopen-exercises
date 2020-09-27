import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0)) // create votes array , specified lenght and fill zero value

  const handleClick = () => {
    const random = randomNum(0, anecdotes.length)
    console.log(random)
    setSelected(random)
  }
  // generate random number , range - from min(inclusive) to max(exclusive) 
  const randomNum = (min, max) => Math.floor(Math.random() * (max - min) + min)

  const incVotes = () => {
    votes[selected] += 1
    setVotes([...votes]) // create brand new array and set that value to votes array
  }

  // const maxValIndex = votes.indexOf(Math.max(...votes))
  const maxVal = (Math.max(...votes))
  const maxValIndex = votes.indexOf(maxVal)

  return (
    <>
      <h1>Anecdotes of the day</h1>
      <span>{anecdotes[selected]}
      <br />
      has {votes[selected]} votes</span>
      <div>
        <button onClick={incVotes}>vote</button>
        <button onClick={handleClick}>next anecdotes</button>
      </div>
      <h1>Anecdotes with most votes</h1>
      <span>{anecdotes[maxValIndex]} <br/>
      has {maxVal} votes </span>
    </>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)

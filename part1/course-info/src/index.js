import React from 'react'
import ReactDOM from 'react-dom'

const Header = props => <h1>{props.course}</h1>

const Total = props => <p>Number of exercises {props.exercises[0] + props.exercises[1] + props.exercises[2]}</p>

const Content = props => <div>
  <Part part = {props.part[0]} exercies = {props.exercies[0]} />
  <Part part = {props.part[1]} exercies = {props.exercies[1]} />
  <Part part = {props.part[2]} exercies = {props.exercies[2]} />
</div>

const Part = props => <div>
  <p>{props.part} {props.exercies}</p>
</div>

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content part = {[part1, part2, part3]} exercies = {[exercises1, exercises2, exercises3]}/>
      <Total exercises = {[exercises1, exercises2, exercises3]} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
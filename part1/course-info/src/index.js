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
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content part = {[part1.name, part2.name, part3.name]} exercies = {[part1.exercises, part2.exercises, part3.exercises]}/>
      <Total exercises = {[part1.exercises, part2.exercises, part3.exercises]} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
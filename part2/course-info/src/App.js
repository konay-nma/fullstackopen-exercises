import React from 'react';
import Course from './component/Course'


const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  // 0 is initialValue of accumulator
  const total = courses.map(course => course.parts.reduce((acc, part) => acc + part.exercises, 0))
  //const total = courses.parts.reduce((acc, part) => acc + part.exercises, 0) // 0 is initialValue of accumulator

  console.log(total)
  return <div>
    <Course course = {courses[0]}  total = {total[0]} />
    <Course course = {courses[1]} total = {total[1]}/>
  </div>

}

export default App;

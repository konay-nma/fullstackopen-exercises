import React from 'react';

const Header = ({ name }) => <h1>{name}</h1>

const Content = ({ part }) => <div> {part.map(item => <Part {...item} key={item.id} />)} </div>

const Part = ({ name, exercises }) => <p>{name} {exercises}</p>

const Course = ({ course }) => {
  return <div>
    <Header name={course.name} />
    <Content part={course.parts} />
  </div>
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
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
      }
    ]
  }

  return <Course course={course} />
}

export default App;

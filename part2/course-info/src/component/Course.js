import React from 'react';

const Header = ({ name }) => <h1>{name}</h1>

const Content = ({ part }) => <div> {part.map(item => <Part {...item} key={item.id} />)} </div>

const Part = ({ name, exercises }) => <p>{name} {exercises}</p>

const Course = ({ course, total }) => {
  return <div>
    <Header name={course.name} />
    <Content part={course.parts} />
    <h5>total of {total} exercises</h5>
  </div>
}

export default Course
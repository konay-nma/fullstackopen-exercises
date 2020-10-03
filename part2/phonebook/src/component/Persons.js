import React from 'react';
const Persons = ({ person, onDelete }) => <><div> {person.name} {person.number} <button onClick = {()=> onDelete(person.id)}>delete</button></div></>
export default Persons
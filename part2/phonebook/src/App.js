import React, { useState } from 'react';
import Filter from './component/Filter';
import PersonForm from './component/PersonForm';
import Persons from './component/Persons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('button clicked', e.target)
    if (newName === '' || newNumber === '') return
    const alreadyAdd = persons.find(person => newName.trim() === person.name)
    console.log(alreadyAdd)
    alreadyAdd === undefined ?
      setPersons([...persons, { name: newName, number: newNumber }])
      :
      alert(`${newName} is already added to phonebook`)
    setNewName('')
    setNewNumber('')
  }
  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handlePhoneChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleFilterChange = (e) => {
    setFilter(e.target.value.toLowerCase())
  }

  const personsToShow = filter === '' ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange = {handleFilterChange} />
      <h3>add new</h3>
      <PersonForm 
        handleSubmit = {handleSubmit}
        handleNameChange = {handleNameChange}
        handlePhoneChange = {handlePhoneChange} 
        newName = {newName} newNumber = {newNumber} />
      <h2>Numbers</h2>
      <Persons personsToShow = {personsToShow} />
    </div>
  )
}

export default App;

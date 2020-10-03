import React, { useEffect, useState } from 'react';

import Filter from './component/Filter';
import PersonForm from './component/PersonForm';
import Persons from './component/Persons';

import service from './service/service';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('button clicked', e.target)
    if (newName === '' || newNumber === '') return
    const alreadyAdd = persons.find(person => newName.trim() === person.name)
    console.log('already',alreadyAdd)
    alreadyAdd === undefined ?
      addPerson(newName, newNumber)
      // setPersons([...persons, { name: newName, number: newNumber }])
      :
      alert(`${newName} is already added to phonebook`)
    setNewName('')
    setNewNumber('')
  }

  const addPerson = (newName, newNumber) => {
    const newObj = {id : persons.length +1 ,name: newName, number: newNumber}
    service
      .create(newObj)
      .then(addPerson => {
        setPersons(persons.concat(addPerson))
      })
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

  useEffect(() => {
    service
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} />
      <h3>add new</h3>
      <PersonForm
        handleSubmit={handleSubmit}
        handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange}
        newName={newName} newNumber={newNumber} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App;

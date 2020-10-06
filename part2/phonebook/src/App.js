import React, { useEffect, useState } from 'react';

import Filter from './component/Filter';
import Notifications from './component/Notifications';
import PersonForm from './component/PersonForm';
import Persons from './component/Persons';

import service from './service/service';
import '../src/index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('button clicked', e.target)
    if (newName === '' || newNumber === '') return
    const alreadyAdd = persons.find(person => newName.trim() === person.name)
    console.log(alreadyAdd)
    alreadyAdd === undefined ?
      addPerson(newName, newNumber)
      // setPersons([...persons, { name: newName, number: newNumber }])
      :
      // alert(`${newName} is already added to phonebook`)
      updatePerson(alreadyAdd.id)
    setNewName('')
    setNewNumber('')
  }

  const addPerson = (newName, newNumber) => {
    const newObj = { name: newName, number: newNumber }
    service
      .create(newObj)
      .then(addPerson => {
        setPersons(persons.concat(addPerson))
        setMessage(`${addPerson.name} is successfully added`)
        nullMessage()
      })
      .catch(error => {
        console.log(error.response.data)
        setErrorMessage(error.response.data)
        nullError()
      })
  }

  const updatePerson = id => {
    const alreadyAddedPerson = persons.find(person => person.id === id)
    const updatePerson = { ...alreadyAddedPerson, number: newNumber }
    console.log('update', updatePerson)
    window.confirm(`${alreadyAddedPerson.name} is already added, replace the old number with the new one?`) &&
      service
        .update(id, updatePerson)
        .then(returnPerson => {
          console.log('return valure', returnPerson)
          setPersons(persons.map(person => person.id !== id ? person : returnPerson))
          setMessage(`${returnPerson.name} is successfully updated`)
          nullMessage()
        })
        .catch(err => {
          console.log(err)
        })
  }

  const nullMessage = () => {
    setTimeout(()=> {
      setMessage(null)
    }, 5000)
  }

  const nullError = () => {
    setTimeout(()=> {
      setErrorMessage(null)
    }, 5000)
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

  const onDelete = id => {
    const deletePerson = persons.find(person => id === person.id)
    const isDeleted = window.confirm(`Delted ${deletePerson.name}?`)
    const afterDeleted = persons.filter(person => id !== person.id)
    if (!isDeleted) return
    service
      .deletePerson(id)
      .then(res => {
        setPersons(afterDeleted)
        setMessage(`${deletePerson.name} is successfully deleted`)
        nullMessage()
      })
      .catch(err => {
        setErrorMessage(`information of ${deletePerson.name} has been already removed from the server`)
        setPersons(persons.filter(person => person.id !== id))
        nullError()
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notifications errorMessage = {errorMessage} message = {message} />
      <Filter handleFilterChange={handleFilterChange} />
      <h3>add new</h3>
      <PersonForm
        handleSubmit={handleSubmit}
        handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange}
        newName={newName} newNumber={newNumber} />
      <h2>Numbers</h2>
      {
        personsToShow.map(person => <Persons person={person} key={person.id} onDelete={() => onDelete(person.id)} />)
      }
    </div>
  )
}

export default App;

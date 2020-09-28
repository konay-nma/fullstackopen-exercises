import React, { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('button clicked', e.target)
    if (newName === '') return
    const alreadyAdd = persons.find(person => newName.trim() === person.name)
    console.log(alreadyAdd)
    alreadyAdd === undefined ?
      setPersons([...persons, { name: newName }])
      :
      alert(`${newName} is already added to phonebook`)
    setNewName('')
  }
  const handleNameChnge = (e) => {
    setNewName(e.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChnge} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <div key={person.name}> {person.name}</div>)}
    </div>
  )
}

export default App;

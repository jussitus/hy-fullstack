import axios from 'axios'
import { useEffect, useState } from 'react'

const Person = ({ person }) => {
  return (
    <>{person.name} {person.number}</>
  )
}

const Persons = ({ persons, searchword }) => {
  return (
    <>
      <ul>
        {persons.filter(person => person.name.toLowerCase().includes(searchword.toLowerCase())).map(person => <li key={person.name}>
          <Person person={person} />
        </li>)}
      </ul>
    </>
  )
}

const Filter = ({ handleSearchwordChange }) => {
  return (
    <>filter <input onChange={handleSearchwordChange} /></>
  )
}

const PersonForm = ({ newName, newNumber, addPerson, handleNameChange, handleNumberChange }) => {
  return (
    <>
      <form onSubmit={addPerson}>
        <div>name: <input value={newName} onChange={handleNameChange} /></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
        <div><button type="submit">add</button></div>
      </form>
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchword, setSearchword] = useState('')

  useEffect(() => {
    console.log('effect here')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log(response)
        setPersons(response.data)
      })
  }, [])


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleSearchwordChange = (event) => {
    setSearchword(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      }
      setPersons(persons.concat(personObject))
    }
    setNewName('')
    setNewNumber('')

  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleSearchwordChange={handleSearchwordChange} />
      <h2>add new</h2>
      <PersonForm newName={newName} newNumber={newNumber} addPerson={addPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} searchword={searchword} />
    </div>
  )

}

export default App
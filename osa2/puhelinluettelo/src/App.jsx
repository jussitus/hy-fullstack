import personService from './services/persons'
import { useEffect, useState } from 'react'

const Notification = ({ message, error }) => {
  let style = {
    fontSize: '1.5em',
    border: 'solid',
    padding: '0.25em',
    marginBottom: '1em',
  }
  style.color = error ? 'red' : 'green'

  if (message === null) {
    return null
  }
  return (
    <div style={style}>{message}</div>
  )
}



const Person = ({ person }) => {
  return (
    <>{person.name} {person.number}</>
  )
}

const Persons = ({ persons, searchword, deletePerson }) => {
  return (
    <>
      <ul>
        {persons.filter(person => person.name.toLowerCase().includes(searchword.toLowerCase())).map(person => <li key={person.id}>
          <Person person={person} /> <button type="submit" value={person.id} onClick={deletePerson}>delete</button>
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
  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    personService.getAllPersons()
      .then(returnedPersons => {
        setPersons(returnedPersons)
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
    const personObject = {
      name: newName,
      number: newNumber,
    }
    if (persons.some(person => person.name === newName)) {
      if (confirm(`${newName} is already added to phonebook, replace phone number?`)) {
        let id = persons.find(person => person.name === newName).id
        personService.updatePerson(id, personObject)
          .then(returnedPerson => setPersons(persons.filter(person => person.id !== id).concat(returnedPerson)))
          .then(() => {
            setNotification('Updated ' + newName)
            setNewName('')
            setNewNumber('')
          })
      }
      return
    }
    personService.createPerson(personObject)
      .then(returnedPerson => setPersons(persons.concat(returnedPerson)))
      .then(() => {
        setNotification('Added ' + newName)
        setNewName('')
        setNewNumber('')
      })
    setTimeout(() => setNotification(null), 5000)
  }

  const deletePerson = (event) => {
    let id = event.target.value
    let name = persons.find(person => person.id === id).name
    if (!confirm(`Really delete ${name}?`)) {
      return
    }
    personService.deletePerson(id)
      .then(deletedPerson => {
        setNotification('Deleted ' + name)
        setPersons(persons.filter(person => deletedPerson.id !== person.id))
      })
      .catch(e => {
        console.log('error: tried to delete person, but person not found')
        setNotification(name + ' already deleted from the server')
        setError(true)
      })
    setTimeout(() => { setNotification(null); setError(false) }, 5000)

  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} error={error} />
      <Filter handleSearchwordChange={handleSearchwordChange} />
      <h2>add new</h2>
      <PersonForm newName={newName} newNumber={newNumber} addPerson={addPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} searchword={searchword} deletePerson={deletePerson} />
    </div>
  )

}

export default App
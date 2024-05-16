import { Notification } from './components/Notification'
import personService from './services/persons'
import { useEffect, useState } from 'react'
import { Persons } from './components/Persons'
import { Filter } from './components/Filter'
import { PersonForm } from './components/PersonForm'

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
      .catch(error => {
        setNotification(error.response.data.error)
        setError(true)
        setNewName('')
        setNewNumber('')
      })
    setTimeout(() => {setNotification(null); setError(false)}, 10000)
  }

  const deletePerson = (event) => {
    let id = event.target.value
    console.log(persons)
    console.log(id)
    let name = persons.find(person => person.id === id).name
    if (!confirm(`Really delete ${name}?`)) {
      return
    }
    personService.deletePerson(id)
      .then(() => {
        console.log("are were there yet")
        setNotification('Deleted ' + name)
        setPersons(persons.filter(person => id !== person.id))
      })
      .catch(e => {
        console.log('error: tried to delete person, but person not found')
        setNotification(name + ' already deleted from the server')
        setError(true)
      })
    console.log(persons)
    setTimeout(() => { setNotification(null); setError(false) }, 10000)
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
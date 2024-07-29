import { useState, useEffect } from 'react'
import personService from './services/persons'
import { Filter } from './components/Filter'
import { PersonForm } from './components/PersonForm'
import { Persons } from './components/Persons'
import { Notification } from './components/Notification'
import './index.css'

function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [number, setNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState({ type: null, text: null })
  const filteredPersons = filter
    ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  const handleNameChange = (e) => setNewName(e.target.value)
  const handleNumberChange = (e) => setNumber(e.target.value)
  const handleFilterChange = (e) => setFilter(e.target.value)

  const setNewMessage = ({ type, text }) => {
    setMessage({ type, text })
    setTimeout(() => setMessage({ type: null, text: null }), 5000)
  }

  const addPerson = (e) => {
    e.preventDefault()

    const personInPhoneBook = persons.find(person => person.name === newName)

    const personObject = {
      name: newName,
      number: number,
    }

    if (personInPhoneBook) {
      const replaceConfirmed = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)

      if (replaceConfirmed) {
        personService
          .update(personInPhoneBook.id, personObject)
          .then(returnedPerson => {
            setNewMessage({ type: 'success', text: `Added ${returnedPerson.name}` })
            setPersons(persons.map(person => person.id !== personInPhoneBook.id ? person : returnedPerson))
            setNewName('')
            setNumber('')
          })
          .catch(error => {
            console.log(error)
            if (error.response?.request.status === 400) {
              setNewMessage({ type: 'error', text: error.response.data.error })
            } else {
              setNewMessage({ type: 'error', text: `Information of ${personInPhoneBook.name} has already been removed from server` })
              setPersons(persons.filter(person => person.id !== personInPhoneBook.id))
            }
          })
      }

      return
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setNewMessage({ type: 'success', text: `Added ${returnedPerson.name}` })
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNumber('')
      })
      .catch(error => {
        setNewMessage({ type: 'error', text: error.response.data.error })
      })
  }

  const removePersonOf = id => {
    const person = persons.find(person => person.id === id)
    const isConfirmed = window.confirm(`Delete ${person.name}?`)

    if (isConfirmed) {
      personService
        .remove(id)
        .then(() => setPersons(persons.filter(person => person.id !== id)))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message} />

      <Filter filter={filter} onChange={handleFilterChange} />

      <h2>Add a new</h2>

      <PersonForm addPerson={addPerson} newName={newName} number={number} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />

      <h2>Numbers</h2>

      <Persons persons={filteredPersons} removePerson={removePersonOf} />
    </div>
  )
}

export default App

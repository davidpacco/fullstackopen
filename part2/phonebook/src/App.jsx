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
  const [message, setMessage] = useState(null)
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
            setMessage(`Added ${returnedPerson.name}`)
            setTimeout(() => setMessage(null), 5000)
            setPersons(persons.map(person => person.id !== personInPhoneBook.id ? person : returnedPerson))
            setNewName('')
            setNumber('')
          })
      }

      return
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setMessage(`Added ${returnedPerson.name}`)
        setTimeout(() => setMessage(null), 5000)
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNumber('')
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

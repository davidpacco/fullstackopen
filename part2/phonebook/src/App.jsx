import { useState, useEffect } from 'react'
import personService from './services/persons'
import { Filter } from './components/Filter'
import { PersonForm } from './components/PersonForm'
import { Persons } from './components/Persons'


function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [number, setNumber] = useState('')
  const [filter, setFilter] = useState('')
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

    if (personInPhoneBook) return alert(`${newName} is already added to phonebook`)

    const personObject = {
      name: newName,
      number: number,
      id: persons.length + 1
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNumber('')
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} onChange={handleFilterChange} />

      <h2>Add a new</h2>

      <PersonForm addPerson={addPerson} newName={newName} number={number} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />

      <h2>Numbers</h2>

      <Persons persons={filteredPersons} />
    </div>
  )
}

export default App

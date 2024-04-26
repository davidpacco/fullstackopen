import { useState } from 'react'

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [number, setNumber] = useState('')
  const [filter, setFilter] = useState('')
  const filteredPersons = filter
    ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons

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

    setPersons(persons.concat(personObject))
    setNewName('')
    setNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Filter shown with <input value={filter} onChange={handleFilterChange} />
      </div>
      <h2>Add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={number} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map(person =>
          <li key={person.id}>{person.name} {person.number}</li>
        )}
      </ul>
    </div>
  )
}

export default App

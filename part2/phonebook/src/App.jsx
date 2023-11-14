import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' },
    { name: 'testing' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const addName = (event) => {
    event.preventDefault();

    const personsCopy = [...persons];
    personsCopy.push({name: newName});

    setPersons(personsCopy);

    setNewName('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
                  value={newName}
                  onChange={handleNameChange} 
                />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>{console.log(typeof persons)}</div>
      <div>{persons.map(person => <p>{person.name}</p>)}</div>
      ...
    </div>
  )
}

export default App
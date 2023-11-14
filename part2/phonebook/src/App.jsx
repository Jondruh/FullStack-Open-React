import { useState } from 'react'
import SearchBar from './components/SearchBar'
import { Persons } from './components/Persons';
import { PersonForm } from './components/PersonForm';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456', id: 1 },
    { name: 'Ada Lovelace', phone: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', phone: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phone: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [search, setNewSearch] = useState('');
  const [searchPersons, setNewSearchPersons] = useState(persons);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value);
  }

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value);
    if (event.target.value === '') {
      setNewSearchPersons(persons);
    } else {
      setNewSearchPersons(persons.filter(person => {
        return person.name.toLowerCase().includes(event.target.value.toLowerCase())
      }));
    }
  }

  const addName = (event) => {
    event.preventDefault();

    if (persons.some(person => person.name === newName)) {
      alert(`${newName} already exists in the phonebook`);
      return;
    }

    const personsCopy = [...persons];
    personsCopy.push({name: newName, phone: newPhone, id: persons.length + 1});

    setPersons(personsCopy);
    setNewSearchPersons(personsCopy)
    setNewName('');
    setNewPhone('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchBar searchHandler={handleSearchChange} search={search} />

      <h2>Add New</h2>

      <PersonForm 
        addName={addName}
        newName={newName}
        newPhone={newPhone}
        nameChange={handleNameChange}
        phoneChange={handlePhoneChange}
      />

      <h2>Numbers</h2>
      <Persons persons={ searchPersons }/>
    </div>
  )
}

export default App
import { useState, useEffect } from 'react'
import SearchBar from './components/SearchBar'
import { Persons } from './components/Persons';
import { PersonForm } from './components/PersonForm';
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [search, setNewSearch] = useState('');
  const [searchPersons, setNewSearchPersons] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data);
        setNewSearchPersons(response.data)
      });
  }, []);

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
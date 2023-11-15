import { useState, useEffect } from 'react'
import SearchBar from './components/SearchBar'
import { Persons } from './components/Persons';
import { PersonForm } from './components/PersonForm';
import phoneService from './services/phoneService'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [search, setNewSearch] = useState('');
  const [searchPersons, setNewSearchPersons] = useState([]);

  useEffect(() => {
    phoneService.getAll()
      .then(people => {
        setPersons(people);
        setNewSearchPersons(people);
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

  const deleteName = (id) => {
    const targetInd = persons.findIndex(person => person.id === id);
    if (window.confirm(`Delete ${persons[targetInd].name}?`)) {
      phoneService.remove(id)
        .then(response => {
          if (response.status === 200) {
            const newPersons = persons.toSpliced(targetInd, 1);
            setPersons(newPersons);
            setNewSearchPersons(newPersons);
          }
        })
    }
  }

  const updatePerson = (name, phone) => {
    const index = persons.findIndex(person => person.name === name);
    const id = persons[index].id;
    phoneService.update(id, { name, phone }).
      then(response => {
        if (response.status === 200) {
          const newPersons = persons.toSpliced(index, 1, response.data);
          setPersons(newPersons);
          setNewSearchPersons(newPersons);
          setNewName('');
          setNewPhone('');
        }
      });
  }

  const addName = (event) => {
    event.preventDefault();

    if (persons.some(person => person.name === newName)) {
      const message =`${newName} already exists in the phonebook, would you like to update their phone number?`;
      if (confirm(message)) {
        updatePerson(newName, newPhone);
      }
    } else {
      phoneService.create({name: newName, phone: newPhone})
        .then(person => {
          const newPersons = [...persons];
          newPersons.push(person);
          setPersons(newPersons);
          setNewSearchPersons(newPersons);
          setNewName('');
          setNewPhone('');
        })
    }
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
      <Persons persons={ searchPersons } deleteName={ deleteName }/>
    </div>
  )
}

export default App
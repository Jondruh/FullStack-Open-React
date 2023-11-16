import { useState, useEffect } from 'react'
import SearchBar from './components/SearchBar'
import { Persons } from './components/Persons';
import { PersonForm } from './components/PersonForm';
import phoneService from './services/phoneService'
import { Notification } from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [search, setNewSearch] = useState('');
  const [searchPersons, setNewSearchPersons] = useState([]);
  const [message, setMessage] = useState(null);

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
    const person = persons[targetInd];
    if (window.confirm(`Delete ${persons[targetInd].name}?`)) {
      phoneService.remove(id)
        .then(response => {
          if (response.status === 204) {
            const newPersons = persons.toSpliced(targetInd, 1);
            setPersons(newPersons);
            setNewSearchPersons(newPersons);
            flashNotification(`${person.name} has been removed`);
          } else {
            flashNotification(`${person.name} has already been removed from server`, true)
            phoneService.getAll()
            .then(people => {
              setPersons(people);
              setNewSearchPersons(people);
            });
          }
        })
    }
  }

  const updatePerson = (name, number) => {
    const index = persons.findIndex(person => person.name === name);
    const id = persons[index].id;
    const person = persons[targetInd];
    phoneService.update(id, { name, number }).
      then(response => {
        if (response.status === 200) {
          const newPersons = persons.toSpliced(index, 1, response.data);
          setPersons(newPersons);
          setNewSearchPersons(newPersons);
          setNewName('');
          setNewPhone('');
          flashNotification(`${newName} has been updated`);
        } else {
          flashNotification(`${person.name} has already been removed from server`, true)
          phoneService.getAll()
          .then(people => {
            setPersons(people);
            setNewSearchPersons(people);
          });
        }
      });
  }

  const flashNotification = (message, error) => {
    setMessage({message, error});

    setTimeout(() => {
      setMessage(null);
    }, 3000);
  }

  const addName = (event) => {
    event.preventDefault();

    if (persons.some(person => person.name === newName)) {
      const message =`${newName} already exists in the phonebook, would you like to update their phone number?`;
      if (confirm(message)) {
        updatePerson(newName, newPhone);
      }
    } else {
      phoneService.create({name: newName, number: newPhone})
        .then(person => {
          if (!person.name) {
            console.error(person)
            flashNotification('Please enter a name and number', true);
          } else {
            const newPersons = [...persons];
            newPersons.push(person);
            setPersons(newPersons);
            setNewSearchPersons(newPersons);
            setNewName('');
            setNewPhone('');
            flashNotification(`${newName} has been added to the list`)
          }
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={message} />
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
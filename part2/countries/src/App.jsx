import { useState, useEffect } from 'react'
import './App.css'
import countryService from './services/countries'
import { SearchView } from './components/SearchView';

function App() {
  const [countries, setCountries] = useState({});
  const [filter, setFilter] = useState('');

  useEffect(() => {
    countryService.getAll().then(result => setCountries(result))
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }

  return (
    <div>
      <p>Filter Countries: <input value={filter} onChange={handleFilterChange} ></input></p>
      <SearchView countries={countries} search={filter} setSearch={setFilter} />
    </div>
  )
}

export default App

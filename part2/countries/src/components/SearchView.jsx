export const SearchView = ({search, setSearch, countries}) => {
  let names = Object.keys(countries).map(ind => countries[ind].name.common);
  const regex = new RegExp(search, 'i');

  let filtered = names.filter(name => name.match(regex));

  if (filtered.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  } else if (filtered.length === 1) {
    let country = Object.values(countries).find(country => {
      return country.name.common === filtered[0];
    })
    return (
      <CountryInfo country={country} />
    )
  } else {
    return (
      filtered.map(country => {
        return (
          <p>
            {country} 
            <button onClick={() => setSearch(country)}>show</button>
          </p>
        )
    })
    )
  }
}

const CountryInfo = ({country}) => {
  let name = country.name.common;
  let capital = country.capital[0];
  let area = country.area;
  let languages = Object.values(country.languages);
  let flag = country.flags.png

  return (
    <div>
      <h2>{name}</h2>

      <p>Capital City: {capital}</p>
      <p>Land Area: {area}</p>

      <h3>Languages Spoken</h3>
      <ul>
        {languages.map(lang => {
          return <li>{lang}</li>
        })}
      </ul>

      <img src={flag}></img>
    </div>
  )
}
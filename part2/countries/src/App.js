import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {

  const [countries, setCountires] = useState([])
  const [filterCountry, setFilterCountry] = useState('')

  const hook = () => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(res => setCountires(res.data))
  }

  useEffect(hook, [])

  const handleChange = (e) => {
    setFilterCountry(e.target.value)
  }

  const countriesToShow = filterCountry === '' ? [] : countries.filter(country => country.name.toLowerCase().includes(filterCountry.trim().toLowerCase()))

  return (
    <>
      find countries <input value={filterCountry} onChange={handleChange} />
      {((countriesToShow.length > 1 && countriesToShow.length <= 10) || countriesToShow.length === 0) &&
        <div>
          {countriesToShow.map(country => <div key={country.name}>{country.name}</div>)}
        </div>
      }
      {countriesToShow.length > 10 &&
        <div>Too many matches, specify another filter</div>
      }
      {countriesToShow.length === 1 &&
        <div>
          <h2>{countriesToShow[0].name}</h2>
          capital {countriesToShow[0].capital} <br />
          population {countriesToShow[0].population}
          <h3>languages</h3>
          {countriesToShow[0].languages.map(language => <li key={language.name}>{language.name}</li>)}
          <img src={countriesToShow[0].flag} alt="country_flag" width="100px" />
        </div>
      }
    </>
  );
}
export default App;

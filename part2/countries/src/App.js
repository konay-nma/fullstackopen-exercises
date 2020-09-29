import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Country from './component/Country';

const App = () => {
  const [countries, setCountires] = useState([])
  const [filterCountry, setFilterCountry] = useState('')
  const [showCountry, setShowCountry] = useState(false)
  const [country, setCountry] = useState({})
  const hook = () => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(res => setCountires(res.data))
      .then(data => console.log(data))

  }

  useEffect(hook, [])

  const handleChange = (e) => {
    setFilterCountry(e.target.value)
    setShowCountry(false)
  }
  const handleClick = (index) => {
    console.log(index)
    setShowCountry(true)
    setCountry(countriesToShow[index])
  }
  const countriesToShow = filterCountry === '' ? [] : countries.filter(country => country.name.toLowerCase().includes(filterCountry.trim().toLowerCase()))

  return (
    <>
      find countries <input value={filterCountry} onChange={handleChange} />
      {((countriesToShow.length > 1 && countriesToShow.length <= 10 && showCountry === false) || countriesToShow.length === 0) &&
        <div>
          {countriesToShow.map((country, index) =>
            <div key={country.name}>{country.name} <input type="button" value="show" onClick={() => handleClick(index)} /></div>)}
        </div>
      }
      {countriesToShow.length > 1 && countriesToShow.length <= 10 && showCountry === true &&
        <Country country={country} />
      }
      {countriesToShow.length > 10 &&
        <div>Too many matches, specify another filter</div>
      }
      {countriesToShow.length === 1 &&
        <Country country={countriesToShow[0]} />
      }
    </>
  );
}
export default App;

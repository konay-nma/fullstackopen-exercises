import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import Weather from './Weather';

const api_key = process.env.REACT_APP_API_KEY
const weatherUrl = 'http://api.weatherstack.com/current'

const Country = ({ country }) => {
    const [weather, setWeather] = useState(null)
    useEffect(() => {
        Axios.get(`${weatherUrl}?access_key=${api_key}&query=${country.name}`)
            .then(res => setWeather(res.data))
    }, [country.name])

    console.log(weather)
    return (
        <div>
            <h2>{country.name}</h2>
            capital {country.capital} <br />
            population {country.population}
            <h3>languages</h3>
            {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
            <img src={country.flag} alt="country_flag" width="100px" />
            {weather !== null ?
                <Weather weather={weather.current} capital={country.capital} />
                : 
                <div>Loading weather...</div>
            }
            
        </div >
    )
}



export default Country
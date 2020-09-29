import React from 'react';
const Weather = ({ weather, capital }) => {
    return (
        <div>
            <h3>Weather in {capital}</h3>
            <span>temprature:</span>{weather.temperature} <br />
            <img src={weather.weather_icons[0]} width="100px" alt="weather_icon" /> <br />
            <span>wind:{weather.wind_speed} mph direction {weather.wind_dir}</span>
        </div>
    )
}

export default Weather
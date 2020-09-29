import React from 'react';

const Country = ({ countriesToShow }) =>
<div>
    <h2>{countriesToShow.name}</h2>
    capital {countriesToShow.capital} <br />
    population {countriesToShow.population}
    <h3>languages</h3>
    {countriesToShow.languages.map(language => <li key={language.name}>{language.name}</li>)}
    <img src={countriesToShow.flag} alt="country_flag" width="100px" />
</div >

export default Country
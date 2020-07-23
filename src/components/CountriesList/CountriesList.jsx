import React from 'react';

import Flag from '../Flag/Flag';
import './CountriesList.scss'

const CountriesList = ({countries, selectedCountry, onSelect}) => {
  return (
    <div className="cards">
      {countries.map(country => {
        return <Flag
                id={country.id}
                key={country.latlng}
                onSelect={onSelect}
                selected={selectedCountry.name === country.name}
                flag={country.flag}
                name={country.name}
                country={country} />
      })}
    </div>
  );
}

export default CountriesList;

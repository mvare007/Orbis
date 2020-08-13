import React from 'react';

import Flag from '../Flag';
import './index.scss'

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
                name={country.name} />
      })}
    </div>
  );
}

export default CountriesList;

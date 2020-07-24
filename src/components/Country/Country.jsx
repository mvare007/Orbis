import React from 'react';
import './Country.scss';

const Country = ({country}) => {
  const { name, flag, topLevelDomain, callingCodes,
          capital, region, subregion,
          population, latlng, demonym, area,
          gini, nativeName,
          currencies, languages } = country

  const renderTable = () => {
    return (
      <div className="table-responsive">
        <table class="table table-dark">
          <tbody>
            <tr>
              <th scope="row">Region:</th>
              <td>{region}</td>
              <th scope="row">Subregion:</th>
              <td>{subregion || "-"}</td>
            </tr>
            <tr>
              <th scope="row">Capital:</th>
              <td>{capital || "-"}</td>
              <th scope="row">Language:</th>
              <td>{Object.values(languages[0])[2] }</td>
            </tr>
            <tr>
              <th scope="row">Native Name:</th>
              <td>{Object.values(nativeName)}</td>
              <th scope="row">Demonym:</th>
              <td>{demonym || "-"}</td>
            </tr>
            <tr>
              <th scope="row">Area:</th>
              <td>{area ? area.toLocaleString() + " km²" : "-"}</td>
              <th scope="row">Population:</th>
              <td>{population.toLocaleString()}</td>
            </tr>
            <tr>
              <th scope="row">Currencies:</th>
              <td>{Object.values(currencies[0])[1]}</td>
              <th scope="row">Gini:</th>
              <td>{gini || "-"}</td>
            </tr>
            <tr>
              <th scope="row">Domain:</th>
              <td>{topLevelDomain}</td>
              <th scope="row">Calling Code:</th>
              <td>{"+" + callingCodes}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div>
      <div className="country" >
        <img src={flag} alt={name + " flag"} />
        <h4>{name}</h4>
      </div>
      <div>
        {renderTable()}
      </div>
    </div>
  );
}

export default Country;

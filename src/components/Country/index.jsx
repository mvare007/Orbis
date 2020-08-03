import React from 'react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import './index.scss';

const Country = ({country}) => {
  const { name, flag, topLevelDomain,
          capital, region, subregion,
          population, demonym, area,
          gini, nativeName, callingCodes,
          currencies, languages, latlng } = country

  const renderTable = () => {
    return (
      <div className="table-responsive-lg">
        <table className="table table-dark table-striped">
          <tbody>
            <tr>
              <th scope="row">Region:</th>
              <td>{region}</td>
            </tr>
            <tr>
              <th scope="row">Subregion:</th>
              <td>{subregion || "-"}</td>
            </tr>
            <tr>
              <th scope="row">Capital:</th>
              <td>{capital || "-"}</td>
            </tr>
            <tr>
              <th scope="row">Language:</th>
              <td>{Object.values(languages[0])[2] }</td>
            </tr>
            <tr>
              <th scope="row">Native Name:</th>
              <td>{Object.values(nativeName)}</td>
            </tr>
            <tr>
              <th scope="row">Demonym:</th>
              <td>{demonym || "-"}</td>
            </tr>
            <tr>
              <th scope="row">Area:</th>
              <td>{area ? area.toLocaleString() + " km²" : "-"}</td>
            </tr>
            <tr>
              <th scope="row">Population:</th>
              <td>{population.toLocaleString()}</td>
            </tr>
            <tr>
              <th scope="row">Currency:</th>
              <td>{Object.values(currencies[0])[1]}</td>
            </tr>
            <tr>
              <th scope="row">Lat/Long::</th>
              <td>{latlng[0]+ ", " + latlng[1]}</td>
            </tr>
            <tr>
              <th scope="row">Gini:</th>
              <td>{gini || "-"}</td>
            </tr>
            <tr>
              <th scope="row">Domain:</th>
              <td>{topLevelDomain}</td>
            </tr>
            <tr>
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
        <TransformWrapper>
          <TransformComponent>
            <img src={flag} alt={name + " flag"} />
          </TransformComponent>
        </TransformWrapper>
        <h4>{name}</h4>
        <div>
          {renderTable()}
        </div>
      </div>
    </div>
  );
}

export default Country;


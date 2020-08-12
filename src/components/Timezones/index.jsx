import React from 'react';
import moment from 'moment-timezone';

import CityInfo from '../CityInfo';
import './index.scss';

const Timezones = ({country}) => {

  const timeZones = moment.tz.zonesForCountry(country) || [];

  return (
    <div className="timeZones">
      {timeZones.map(timezone => {
        return <CityInfo
                timezone={timezone}
                name={timezone.split('/').pop().replace(/[_-]/g, " ")}
                key={timezone}/>
      })}
    </div>
  );
}

export default Timezones;

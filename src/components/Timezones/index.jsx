import React from 'react';
import moment from 'moment-timezone';

import WorldClock from '../WorldClock/index';
import './index.scss';

const Timezones = ({country}) => {

  const timeZones = moment.tz.zonesForCountry(country) || [];

  return (
    <div className="timeZones">
      {timeZones.map(timezone => {
        return <WorldClock
                timezone={timezone}
                name={timezone.split('/').pop().replace(/[_-]/g, " ")}
                key={timezone}/>
      })}
    </div>
  );
}

export default Timezones;

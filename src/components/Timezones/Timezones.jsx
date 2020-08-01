import React from 'react';
import moment from 'moment-timezone';

import WorldClock from '../WorldClock/WorldClock';

const Timezones = ({country}) => {
  const timeZones = moment.tz.zonesForCountry(country);
  return (
    <div className="timeZones">
      {timeZones.map(timezone => {
        return <WorldClock
                timezone={timezone}
                key={timezone}/>
      })}
    </div>
  );
}

export default Timezones;

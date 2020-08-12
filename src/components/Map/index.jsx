import React from 'react';
import ReactMapboxGl, { Layer, Source } from 'react-mapbox-gl';

import './index.scss';

const MapBox = ({center, zoom, selectedCountry}) => {

  const Map = ReactMapboxGl({
    accessToken: 'pk.eyJ1IjoibXZhcmUwMDciLCJhIjoiY2s2Y2FocWI3MDBobTNrbXdhZ3pmZnRiOCJ9.F0JHDGeqdYEJrB-XCJHr9Q'
  })

  const rasterSourceOptions = {
    "type": "vector",
    "url": "mapbox://mvare007.583q5hvi"
  };

  const mapboxStyle = ["mapbox://styles/davidchopin/cjtz90km70tkk1fo6oxifkd67",
                      { height: '50vh', width: '100%' }];
  return (
    <Map
    className="scale-in-center"
      center={center}
      zoom={[zoom]}
      containerStyle={mapboxStyle[1]}
      style={mapboxStyle[0]}>
      <Source id="countries" tileJsonSource={rasterSourceOptions} />
       <Layer
         id='countries'
         sourceLayer='ne_10m_admin_0_countries-5zwxab'
         filter={'countries', ['in', 'ADM0_A3_IS'].concat([selectedCountry.alpha3Code || ""])}
         type='fill'
         paint={{
           'fill-color': '#f9cb40',
           'fill-outline-color': '#bced09',
           'fill-opacity': 0.5
         }}  />
    </Map>
  )
}

export default MapBox;

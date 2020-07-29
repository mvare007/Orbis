import React, { Component } from 'react';
import ReactMapboxGl, { Layer, Source } from 'react-mapbox-gl';

import './App.scss';
import loader from '../images/loader.gif';

import CountriesList from './CountriesList/CountriesList';
import Country from './Country/Country';

const REST_COUNTRIES = 'https://restcountries.eu/rest/v2/all';

const Map = ReactMapboxGl({
  accessToken: 'pk.eyJ1IjoibXZhcmUwMDciLCJhIjoiY2s2Y2FocWI3MDBobTNrbXdhZ3pmZnRiOCJ9.F0JHDGeqdYEJrB-XCJHr9Q'
})

const RASTER_SOURCE_OPTIONS = {
  "type": "vector",
  "url": "mapbox://mvare007.583q5hvi"
};

class App extends Component {
  state = {
    countries: [],
    selectedCountry: {},
    loaded: false,
    search: '',
    center: [-7.8536599, 39.557191],
    zoom: [1]
  }

  componentDidMount() {
    fetch(REST_COUNTRIES)
    .then(response => response.json())
    .then(data => {
      this.setState({ countries: data });
    });
  }

  handleSearch = (event) => {
    const { value } = event.target;

    this.setState({
      search: value,
      loaded: false
    });
  }

  handleSelect = (countryName) => {
    const { countries } = this.state;
    const selectedCountry = countries.find(country => country.name === countryName);

    this.setState({
      selectedCountry: selectedCountry,
      center: [selectedCountry.latlng[1], selectedCountry.latlng[0]],
      loaded: true,
      zoom: [4],
      search: ''
    });
  }

  render() {

    const { countries, search, selectedCountry, loaded, center } = this.state
    const filteredCountries = countries.filter(country => country.name.match(new RegExp(search, 'i')))

    return (
      <div className="app">

        <div className="flags">
          <input
            className="search"
            placeholder="Search..."
            onChange={this.handleSearch} />
          <CountriesList
            countries={filteredCountries}
            selectedCountry={selectedCountry}
            onSelect={this.handleSelect}/>
        </div>

        <div className="country-panel">
        { loaded ? <Country country={selectedCountry} /> : <img src={loader} id="loader"/> }
        </div>

        <div className="mapbox">
          <Map
            center={center}
            zoom={[5]}
            containerStyle={{ height: '100%', width: '100%' }}
            style="mapbox://styles/davidchopin/cjtz90km70tkk1fo6oxifkd67">
            <Source id="countries" tileJsonSource={RASTER_SOURCE_OPTIONS} />
             <Layer
               id='countries'
               sourceLayer='ne_10m_admin_0_countries-5zwxab'
               filter={'countries', ['in', 'ADM0_A3_IS'].concat([selectedCountry.alpha3Code || ""])}
               type='fill'
               paint={{
                 'fill-color': 'tomato',
                 'fill-outline-color': 'lime',
                 'fill-opacity': 0.5
               }}  />
          </Map>
        </div>

        <div className="weather">
          Weather
        </div>

      </div>
    );
  }
}

export default App;


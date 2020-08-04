import React, { Component } from 'react';
import ReactMapboxGl, { Layer, Source } from 'react-mapbox-gl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'

import './App.scss';
import loader from '../images/loader.gif';

import CountriesList from './CountriesList/index';
import Country from './Country/index';
import Timezones from './Timezones/index'

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
    center: [-90, 90],
    zoom: [0]
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

    const { countries, search, selectedCountry, loaded, center } = this.state;
    const filteredCountries = countries.filter(country => country.name.match(new RegExp(search, 'i')));
    const mapboxStyle = "mapbox://styles/davidchopin/cjtz90km70tkk1fo6oxifkd67";

    return (
      <div className="app">

        <div className="flags">
          <div className="search input-group">
            <div className="input-group-prepend">
              <span className="responsive-icon input-group-text">
                <FontAwesomeIcon icon={faSearch} />
              </span>
            </div>
            <input
              className="responsive-font form-control"
              placeholder="Search..."
              onChange={this.handleSearch} />
            </div>
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
            zoom={[this.state.zoom]}
            containerStyle={{ height: '50vh', width: '100%' }}
            style={mapboxStyle}>
            <Source id="countries" tileJsonSource={RASTER_SOURCE_OPTIONS} />
             <Layer
               id='countries'
               sourceLayer='ne_10m_admin_0_countries-5zwxab'
               filter={'countries', ['in', 'ADM0_A3_IS'].concat([selectedCountry.alpha3Code || ""])}
               type='fill'
               paint={{
                 'fill-color': 'tomato',
                 'fill-outline-color': 'red',
                 'fill-opacity': 0.5
               }}  />
          </Map>
        </div>

        <div className="time">
          { loaded ? <Timezones country={selectedCountry.alpha2Code}/> : <img src={loader} id="loader"/> }
        </div>

      </div>
    );
  }
}

export default App;


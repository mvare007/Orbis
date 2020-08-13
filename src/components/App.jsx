import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import './App.scss';

import CountriesList from './CountriesList';
import Country from './Country';
import MapBox from './Map';
import Timezones from './Timezones';
import CircleInferno from './Introduction/circleInferno';
import Earth from './Introduction';

const REST_COUNTRIES = 'https://restcountries.eu/rest/v2/all';

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
      search: value
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
    const { countries, search, selectedCountry, loaded, center, zoom } = this.state;
    const filteredCountries = countries.filter(country => country.name.match(new RegExp(search, 'i')));
    let randomCountry = countries[Math.floor(Math.random() * countries.length)] || [];


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
              onChange={this.handleSearch}
              autoFocus={true} />
            </div>
          <CountriesList
            countries={filteredCountries}
            selectedCountry={selectedCountry}
            onSelect={this.handleSelect}/>
        </div>

        <div className="country">
          { loaded ? <Country country={selectedCountry} />
                     : <Earth/> }
        </div>

        <div className="mapbox">
          { loaded ?  <MapBox
                        center={center}
                        zoom={zoom}
                        selectedCountry={selectedCountry}/>
                        : null }
        </div>

        <div className="time">
          { loaded ? <Timezones country={selectedCountry.alpha2Code}/>
                     : <CircleInferno country={randomCountry} /> }
        </div>

      </div>
    );
  }
}

export default App;


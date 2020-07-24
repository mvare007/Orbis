import React, { Component } from 'react';

import './App.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import CountriesList from './CountriesList/CountriesList';
import Country from './Country/Country';

const REST_COUNTRIES = 'https://restcountries.eu/rest/v2/all';

class App extends Component {
  state = {
    countries: [],
    selectedCountry: {},
    loaded: false,
    search: ''
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
      loaded: true
    });
  }

  render() {
    const { countries, search, selectedCountry, loaded } = this.state
    const filteredCountries = countries.filter(country => country.name.match(new RegExp(search, 'i')))
    return (
      <div className="app">

        <div className="flags">
          <input
            className="form-control-sm search"
            placeholder="Search countries..."
            onChange={this.handleSearch} />
          <CountriesList
            countries={filteredCountries}
            selectedCountry={selectedCountry}
            onSelect={this.handleSelect}/>
        </div>

        <div className="country-panel">
        { loaded ? <Country country={selectedCountry} /> : "Select a Country" }
        </div>

        <div className="map">
          Map
        </div>

        <div className="weather">
          Weather
        </div>

      </div>
    );
  }
}

export default App;


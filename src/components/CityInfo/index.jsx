import React, { Component }  from 'react';
import Clock from 'react-live-clock';

import './index.scss';

const API_KEY = "1266122f733dd27af625e17e74ef7e68";

class CityInfo extends Component {
  state = {
    weather: []
  }

  componentDidMount() {
    const openWeather = ` http://api.openweathermap.org/data/2.5/weather?q=${this.props.name}&units=metric&appid=${API_KEY}`;
    fetch(openWeather)
    .then(response => response.json())
    .then(data => {
      this.setState({ weather: data });
    });
  }

  renderWeather = () => {
    if (this.state.weather.main !== undefined) {
      const { temp } = this.state.weather.main;
      const { description, icon } = this.state.weather.weather[0]
      const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

      return(
        <div className="weather">
          <span>{parseInt(temp)}°C</span>
          <img src={iconUrl} alt="weather"/>
          <span id="weatherDescription">{description}</span>
        </div>
       );
    }
  }

  render() {
    const { name, timezone } = this.props

    return(
      <div className="card-city">
        <h2>{name}</h2>
        <Clock
          className="clock"
          format={'HH:mm'}
          ticking={true}
          timezone={timezone} />
          {this.renderWeather()}
      </div>
    )
  }
}

export default CityInfo;


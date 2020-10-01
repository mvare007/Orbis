import React, { Component } from "react";
import Clock from "react-live-clock";

import "./index.scss";

const API_KEY = "1266122f733dd27af625e17e74ef7e68";

class CityInfo extends Component {
  state = {
    weather: [],
    fetching: false,
  };

  componentDidMount() {
    this.setState({ fetching: true });
    const openWeather = `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=${this.props.name}&units=metric&appid=${API_KEY}`;
    fetch(openWeather)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          weather: data,
          fetching: false,
        });
      });
  }

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  };

  renderWeather = () => {
    if (this.state.weather.main !== undefined) {
      const { temp } = this.state.weather.main;
      const { description, icon } = this.state.weather.weather[0];
      const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

      return (
        <div className="weather">
          <div>
            <img src={iconUrl} alt="weather" />
          </div>
          <div>
            <span>{parseInt(temp)}°C</span>
          </div>
          <div>
            <span id="weatherDescription">{description}</span>
          </div>
        </div>
      );
    }
  };

  render() {
    const noInformation = (
      <span id="noInfo">No weather information available</span>
    );
    const { name, timezone } = this.props;
    const { fetching } = this.state;
    return (
      <div className="city">
        <div className="card-city">
          <h2>{name}</h2>
          <Clock
            className="clock"
            format={"HH:mm"}
            ticking={true}
            timezone={timezone}
          />
          {fetching ? (
            <div className="spinner-grow spinner-grow-sm mx-auto" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            this.renderWeather() || noInformation
          )}
        </div>
      </div>
    );
  }
}

export default CityInfo;

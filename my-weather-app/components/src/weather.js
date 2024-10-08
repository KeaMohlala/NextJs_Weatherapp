import React, { useState } from "react";
import axios from "axios";
import WeatherSearch from "./weathersearch";
import Forecast from "./forecast";
import "./index.css";

export default function Weather(props) {
  const [weatherInfo, setWeatherInfo] = useState({ ready: false });
  const [city, setCity] = useState(props.defaultCity);
  function cityWeather(response) {
    setWeatherInfo({
      ready: true,
      coordinates: response.data.coord,
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      city: response.data.name,
      humidity: response.data.main.humidity,
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
      date: new Date(response.data.dt * 1000),
    });
  }
  function search() {
    const apiKey = "9cb72bec958f8fb02391985ed7b219d2";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(cityWeather);
  }
  function handleSubmit(event) {
    event.preventDefault();
    search(city);
  }
  function handleCityChange(event) {
    setCity(event.target.value);
  }
  if (weatherInfo.ready) {
    return (
      <div>
        <div className="container">
          <form
            className="search-form"
            id="search-form"
            onSubmit={handleSubmit}
          >
            <div className="row">
              <div className="col-9">
                <input
                  type="search"
                  placeholder="Type a city.."
                  autoFocus="on"
                  autoComplete="off"
                  className="form-control shadow-sm"
                  id="search-input"
                  onChange={handleCityChange}
                />
              </div>
              <div className="col-3">
                <input
                  type="submit"
                  value="Search"
                  className="form-control btn btn-info shadow-sm w-100"
                />
              </div>
            </div>
          </form>
          <br />
          <WeatherSearch data={weatherInfo} />
          <Forecast coordinates={weatherInfo.coordinates} />
        </div>
      </div>
    );
  } else {
    search();
    return "loading...";
  }
}

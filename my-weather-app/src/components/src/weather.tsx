import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherSearch from "./weathersearch";
import Forecast from "./forecast";
import "./index.css";

interface WeatherProps {
  defaultCity: string;
}

interface WeatherData {
  ready: boolean;
  coordinates?: { lat: number; lon: number };
  temperature?: number;
  wind?: number;
  city?: string;
  humidity?: number;
  description?: string;
  icon?: string;
  date?: Date;
}

export default function Weather({ defaultCity }: WeatherProps) {
  const [weatherInfo, setWeatherInfo] = useState<WeatherData>({ ready: false });
  const [city, setCity] = useState<string>(defaultCity);

  function cityWeather(response: any) {
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
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_API_KEY}&units=metric`;
    axios.get(apiUrl).then(cityWeather);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    search();
  }

  function handleCityChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCity(event.target.value);
  }

  useEffect(() => {
    if (!weatherInfo.ready) {
      search();
    }
  }, [weatherInfo.ready]);

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
                  autoFocus
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
          <Forecast coordinates={weatherInfo.coordinates!} />
        </div>
      </div>
    );
  } else {
    return <div className="loading">Loading...</div>;
  }
}

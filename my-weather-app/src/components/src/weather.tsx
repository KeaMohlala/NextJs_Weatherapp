import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherSearch from "./weathersearch";
import Forecast from "./forecast";
//import "./index.css";

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
      <div className="container mx-auto p-5">
        <form
          className="search-form mb-5"
          id="search-form"
          onSubmit={handleSubmit}
        >
          <div className="flex">
            <div className="flex-grow mr-2">
              <input
                type="search"
                placeholder="Type a city.."
                autoFocus
                autoComplete="off"
                className="form-control shadow-sm p-2 border rounded"
                id="search-input"
                onChange={handleCityChange}
              />
            </div>
            <div className="flex-shrink">
              <input
                type="submit"
                value="Search"
                className="form-control btn bg-blue-500 text-white shadow-sm w-full rounded"
              />
            </div>
          </div>
        </form>
        {/* Only pass weatherInfo to WeatherSearch when all required data is present */}
        {weatherInfo.city &&
          weatherInfo.temperature !== undefined &&
          weatherInfo.date &&
          weatherInfo.icon &&
          weatherInfo.description &&
          weatherInfo.humidity !== undefined &&
          weatherInfo.wind !== undefined && (
            <WeatherSearch
              data={{
                city: weatherInfo.city,
                temperature: weatherInfo.temperature,
                date: weatherInfo.date,
                icon: weatherInfo.icon,
                description: weatherInfo.description,
                humidity: weatherInfo.humidity,
                wind: weatherInfo.wind,
              }}
            />
          )}
        <Forecast coordinates={weatherInfo.coordinates!} />
      </div>
    );
  } else {
    return <div className="text-center text-gray-500">Loading...</div>;
  }
}

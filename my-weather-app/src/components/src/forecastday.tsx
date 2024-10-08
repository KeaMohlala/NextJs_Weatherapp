import React from "react";
import WeatherIcon from "./weathericon";

// Define prop types for ForecastDay
interface ForecastDayProps {
  data: {
    dt: number;
    temp: {
      min: number;
      max: number;
    };
    weather: {
      icon: string;
    }[];
  };
}

export default function ForecastDay({ data }: ForecastDayProps) {
  function maxTemperature() {
    let temperature = Math.round(data.temp.max);
    return `${temperature}`;
  }

  function minTemperature() {
    let temperature = Math.round(data.temp.min);
    return `${temperature}`;
  }

  function day() {
    let date = new Date(data.dt * 1000);
    let day = date.getDay();
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[day];
  }

  return (
    <div>
      <div className="card mt-1 mb-3">
        <div className="card-body">
          <h5 className="card-title forecast-date">{day()}</h5>
          <div className="weather-forecast">
            <span className="card-text weather-forecast-min">
              <p>{minTemperature()}°C</p>
            </span>
            <span className="card-text weather-forecast-max">
              <p>{maxTemperature()}°C</p>
            </span>
          </div>
          <span className="weather-forecast-icon">
            <WeatherIcon code={data.weather[0].icon} size={40} />
          </span>
        </div>
      </div>
    </div>
  );
}

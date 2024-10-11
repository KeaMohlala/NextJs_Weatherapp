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
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="text-center">
        <h5 className="text-lg font-bold mb-2">{day()}</h5>
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm font-medium">{minTemperature()}°C</p>
          <p className="text-sm font-medium">{maxTemperature()}°C</p>
        </div>
        <div className="flex justify-center items-center">
          <WeatherIcon code={data.weather[0].icon} size={40} />
        </div>
      </div>
    </div>
  );
}

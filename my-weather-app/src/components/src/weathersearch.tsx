import React from "react";
import FormattedDate from "./formatteddate";
import WeatherIcon from "./weathericon";
import WeatherTemperature from "./weathertemperature";
import "./index.css";

interface WeatherSearchProps {
  data: {
    city: string;
    temperature: number;
    date: Date;
    icon: string;
    description: string;
    humidity: number;
    wind: number;
  };
}

export default function WeatherSearch({ data }: WeatherSearchProps) {
  return (
    <div className="Weathersearch bg-gradient-to-t from-blue-300 to-blue-500 text-white p-5 rounded-lg shadow-lg">
      <div className="city text-4xl font-bold mb-2">
        <span id="cities">
          {data.city} {""}{" "}
        </span>
        <WeatherTemperature celcius={data.temperature} />
      </div>
      <div className="search" id="date">
        <FormattedDate date={data.date} alt={data.description} />
      </div>
      <div>
        <WeatherIcon code={data.icon} size={50} />
      </div>
      <div className="description text-capitalize text-xl" id="description">
        {data.description}
      </div>
      <div className="moreinfo flex justify-around mt-4">
        <span className="humidity text-sm">Humidity: {data.humidity}%</span>
        <span className="wind text-sm">Wind: {Math.round(data.wind)} km/h</span>
      </div>
    </div>
  );
}

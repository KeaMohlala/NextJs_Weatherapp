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
    <div className="Weathersearch">
      <div className="city">
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
      <div className="description text-capitalize" id="description">
        {data.description}
      </div>
      <div className="moreinfo">
        <span className="humidity" id="humidity">
          Humidity: {data.humidity}%
        </span>
        <span className="wind" id="wind">
          Wind: {Math.round(data.wind)} km/h
        </span>
      </div>
    </div>
  );
}

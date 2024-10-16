import React from "react";
import Link from "next/link";
import FormattedDate from "./formatteddate";
import WeatherIcon from "./weathericon";
import WeatherTemperature from "./weathertemperature";
import City from "./city";
import { GoArrowRight } from "react-icons/go";
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
    feelsLike: number;
    precipitation: number;
    sunrise: number;
    sunset: number;
    clouds: number;
    timezone: number;
  };
  isFavourited: boolean;
  onFavouriteChange: (city: string) => void;
}

export default function WeatherSearch({
  data,
  isFavourited,
  onFavouriteChange,
}: WeatherSearchProps) {
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
      <div className="flex justify-center items-center">
        <WeatherIcon code={data.icon} size={50} />
      </div>
      <div className="description text-capitalize text-xl" id="description">
        {data.description}
      </div>
      <div className="moreinfo flex justify-around mt-4">
        <span className="humidity text-sm">Humidity: {data.humidity}%</span>
        <span className="wind text-sm">Wind: {Math.round(data.wind)} km/h</span>
      </div>
      <div className="flex justify-between mt-4">
        <div>
          <City
            cityName={data.city}
            isFavourited={isFavourited} // isFavourited prop passed
            onFavouriteChange={() => onFavouriteChange(data.city)} // Corrected function
          />
        </div>
        <Link
          href={{
            pathname: "/weatherDetails",
            query: {
              city: data.city,
              clouds: data.clouds,
              feelsLike: data.feelsLike,
              precipitation: data.precipitation,
              sunrise: data.sunrise,
              sunset: data.sunset,
              timezone: data.timezone,
            },
          }}
          className="text-white text px-4 rounded hover:bg-blue-300"
        >
          <GoArrowRight size={30} />
        </Link>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { GetServerSideProps } from "next";
import WeatherSearch from "../components/src/weathersearch";

interface HomeProps {
  initialData: {
    city: string;
    temperature: number;
    date: Date;
    icon: string;
    description: string;
    humidity: number;
    wind: number;
  };
}

const Home: React.FC<HomeProps> = ({ initialData }) => {
  const [weatherData, setWeatherData] = useState(initialData);
  const [searchCity, setSearchCity] = useState(""); // For input value

  // Function to handle search and update weather data
  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    if (searchCity) {
      const apiUrl = `/api/weather?city=${searchCity}`; //to keep API Key secure
      const response = await fetch(apiUrl);
      const data = await response.json();
      setWeatherData({
        city: data.weather.name,
        temperature: data.weather.main.temp,
        date: new Date().toISOString(), // Convert to string
        icon: data.weather.weather[0].icon,
        description: data.weather.weather[0].description,
        humidity: data.weather.main.humidity,
        wind: data.weather.wind.speed,
      });
    }
  };

  return (
    <div className="weather-app">
      <h1>Weather App</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter city name"
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <WeatherSearch data={weatherData} />
    </div>
  );
};

// Server-Side Rendering (SSR) for the initial load
export const getServerSideProps: GetServerSideProps = async () => {
  const city = "Johannesburg"; // Default city for initial SSR
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/weather?city=${city}`;
  const response = await fetch(apiUrl);
  const data = await response.json();

  // Log the data to see its structure
  console.log(data);

  return {
    props: {
      initialData: {
        city: data.weather ? data.weather.name : "Unknown",
        temperature: data.weather ? data.weather.main.temp : 0,
        date: new Date().toISOString(), // Convert to string
        icon:
          data.weather && data.weather.weather.length > 0
            ? data.weather.weather[0].icon
            : "",
        description:
          data.weather && data.weather.weather.length > 0
            ? data.weather.weather[0].description
            : "",
        humidity: data.weather ? data.weather.main.humidity : 0,
        wind: data.weather ? data.weather.wind.speed : 0,
      },
    },
  };
};

export default Home;

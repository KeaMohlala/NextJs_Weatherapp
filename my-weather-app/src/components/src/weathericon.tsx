import React from "react";
import ReactAnimatedWeather from "react-animated-weather";

interface WeatherIconProps {
  code: string;
  size: number;
}

export default function WeatherIcon({ code, size }: WeatherIconProps) {
  const codemapping: { [key: string]: string } = {
    "01d": "CLEAR_DAY",
    "01n": "CLEAR_NIGHT",
    "02d": "PARTLY_CLOUDY_DAY",
    "02n": "PARTLY_CLOUDY_NIGHT",
    "03d": "PARTLY_CLOUDY_DAY",
    "03n": "PARTLY_CLOUDY_NIGHT",
    "04d": "CLOUDY",
    "04n": "CLOUDY",
    "09d": "RAIN",
    "09n": "RAIN",
    "10d": "RAIN",
    "10n": "RAIN",
    "11d": "RAIN",
    "11n": "RAIN",
    "13d": "SNOW",
    "13n": "SNOW",
    "50d": "FOG",
    "50n": "FOG",
  };

  return (
    <ReactAnimatedWeather
      icon={codemapping[code]}
      color="#7B7B7B"
      size={size}
      animate={true}
    />
  );
}

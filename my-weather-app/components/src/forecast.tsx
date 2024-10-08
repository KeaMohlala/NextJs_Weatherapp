import React, { useState, useEffect } from "react";
import ForecastDay from "./forecastday";
import axios from "axios";

// Define prop types
interface Coordinates {
  lat: number;
  lon: number;
}

interface ForecastProps {
  coordinates: Coordinates;
}

interface DailyForecast {
  dt: number;
  temp: {
    min: number;
    max: number;
  };
  weather: { icon: string }[];
}

export default function Forecast({ coordinates }: ForecastProps) {
  const [ready, setReady] = useState(false);
  const [forecast, setForecast] = useState<DailyForecast[]>([]);

  useEffect(() => {
    setReady(false);
  }, [coordinates]);

  function handleResponse(response: any) {
    setReady(true);
    setForecast(response.data.daily);
  }

  if (ready) {
    return (
      <div className="forecast" id="forecast">
        <div className="row mb-3 mt-3">
          {forecast.map((dailyForecast, index) => {
            if (index < 6) {
              return (
                <div className="col-4" key={index}>
                  <ForecastDay data={dailyForecast} />
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    );
  } else {
    const apiKey = "9cb72bec958f8fb02391985ed7b219d2";
    const { lon, lat } = coordinates;
    const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);
    return null;
  }
}

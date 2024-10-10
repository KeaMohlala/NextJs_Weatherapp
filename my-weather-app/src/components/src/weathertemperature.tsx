import React, { useState } from "react";

interface WeatherTemperatureProps {
  celcius: number;
}

export default function WeatherTemperature({
  celcius,
}: WeatherTemperatureProps) {
  const [unit, setUnit] = useState<string>("celcius");

  function convertToFahrenheit(event: React.MouseEvent) {
    event.preventDefault();
    setUnit("fahrenheit");
  }

  function convertToCelsius(event: React.MouseEvent) {
    event.preventDefault();
    setUnit("celcius");
  }

  if (unit === "celcius") {
    return (
      <div>
        <span className="temperature" id="temp">
          {Math.round(celcius)}
        </span>
        <span className="units">
          °C |{" "}
          <a href="/" id="fahrenheit-link" onClick={convertToFahrenheit}>
            °F{" "}
          </a>
        </span>
      </div>
    );
  } else {
    let fahrenheit = (celcius * 9) / 5 + 32;
    return (
      <div>
        <span className="temperature" id="temp">
          {Math.round(fahrenheit)}
        </span>
        <span className="units">
          <a href="/" id="celcius-link" onClick={convertToCelsius}>
            °C{" "}
          </a>
          | °F{" "}
        </span>
      </div>
    );
  }
}

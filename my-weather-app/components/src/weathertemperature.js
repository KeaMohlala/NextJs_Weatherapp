import React, { useState } from "react";

export default function WeatherTemperature(props) {
  const [unit, setUnit] = useState("celcius");
  function converttoFarenheit(event) {
    event.preventDefault();
    setUnit("farenheit");
  }
  function converttoCelcius(event) {
    event.preventDefault();
    setUnit("celcius");
  }
  if (unit === "celcius") {
    return (
      <div>
        <span className="temperature" id="temp">
          {Math.round(props.celcius)}
        </span>
        <span className="units">
          °C |{" "}
          <a href="/" id="farenheit-link" onClick={converttoFarenheit}>
            °F{" "}
          </a>
        </span>
      </div>
    );
  } else {
    let farenheit = (props.celcius * 9) / 5 + 32;
    return (
      <div>
        <span className="temperature" id="temp">
          {Math.round(farenheit)}
        </span>
        <span className="units">
          <a href="/" id="celcius-link" onClick={converttoCelcius}>
            °C{" "}
          </a>
          | °F{" "}
        </span>
      </div>
    );
  }
}

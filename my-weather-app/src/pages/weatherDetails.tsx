import React from "react";
import { useRouter } from "next/router";

export default function WeatherDetails() {
  const router = useRouter();
  const { city, feelsLike, clouds, precipitation, sunrise, sunset } =
    router.query;

  if (!city) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold mb-4">{city} Weather Details</h1>
      <ul className="list-disc ml-5">
        <li>Feels like: {feelsLike ? `${Number(feelsLike)}°C` : "N/A"}</li>
        <li>Clouds: {clouds ? `${Number(clouds)}%` : "N/A"}</li>
        <li>
          Precipitation: {precipitation ? `${Number(precipitation)} mm` : "N/A"}
        </li>
        <li>
          Sunrise:{" "}
          {sunrise
            ? new Date(Number(sunrise) * 1000).toLocaleTimeString()
            : "N/A"}
        </li>
        <li>
          Sunset:{" "}
          {sunset
            ? new Date(Number(sunset) * 1000).toLocaleTimeString()
            : "N/A"}
        </li>
      </ul>
      <button
        onClick={() => router.push("/")}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Back to Home
      </button>
    </div>
  );
}

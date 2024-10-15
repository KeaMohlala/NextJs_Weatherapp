import React from "react";
import { useRouter } from "next/router";

export default function WeatherDetails() {
  const router = useRouter();
  const { city, feelsLike, clouds, precipitation, sunrise, sunset, timezone } =
    router.query;

  if (!city) {
    return <div>Loading...</div>;
  }

  // Helper function to convert UNIX time to the city's local time
  const formatLocalTime = (unixTime: number, timezone: number) => {
    const date = new Date(unixTime * 1000); // Convert UNIX timestamp to milliseconds
    const utcOffset = timezone * 1000; // Convert timezone offset from seconds to milliseconds
    const localDate = new Date(date.getTime() + utcOffset); // Apply the UTC offset to get local time
    return localDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "UTC", // Force date to be interpreted in UTC after offset
    });
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold mb-4">{city} Weather Details</h1>
      <ul className="list-disc ml-5">
        <li>
          Feels like: {feelsLike ? `${Math.round(Number(feelsLike))}°C` : "N/A"}
        </li>
        <li>Clouds: {clouds ? `${Number(clouds)}%` : "N/A"}</li>
        <li>
          Precipitation: {precipitation ? `${Number(precipitation)} mm` : "N/A"}
        </li>
        <li>
          Sunrise:{" "}
          {sunrise ? formatLocalTime(Number(sunrise), Number(timezone)) : "N/A"}
        </li>
        <li>
          Sunset:{" "}
          {sunset ? formatLocalTime(Number(sunset), Number(timezone)) : "N/A"}
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

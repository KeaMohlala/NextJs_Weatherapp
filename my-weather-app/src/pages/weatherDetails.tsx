my - weather - app / src / pages / weatherDetails.tsx;

import React from "react";
import { useRouter } from "next/router";
import { GoArrowLeft } from "react-icons/go";

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
    <div className="flex justify-center items-center min-h-screen font-sans bg-gradient-to-br from-purple-100 to-blue-100">
      {/* Outer container with light blue  border */}
      <div className="border-4 border-blue-200  p-6 rounded-lg">
        {/* Inner container with white border */}
        <div className="border-2 border-white bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-center">
            {city} Weather Details
          </h1>
          <ul className="list-disc list-inside text-lg mb-6">
            <li>
              Feels like:{" "}
              {feelsLike ? `${Math.round(Number(feelsLike))}°C` : "N/A"}
            </li>
            <li>Clouds: {clouds ? `${Number(clouds)}%` : "N/A"}</li>
            <li>
              Precipitation:{" "}
              {precipitation ? `${Number(precipitation)} mm/h` : "N/A"}
            </li>
            <li>
              Sunrise:{" "}
              {sunrise
                ? formatLocalTime(Number(sunrise), Number(timezone))
                : "N/A"}
            </li>
            <li>
              Sunset:{" "}
              {sunset
                ? formatLocalTime(Number(sunset), Number(timezone))
                : "N/A"}
            </li>
          </ul>
          <div className="flex justify-center">
            <button
              onClick={() => router.push("/")}
              className=" text-blue-400 px-4 rounded hover:bg-blue-500"
            >
              <GoArrowLeft size={30} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


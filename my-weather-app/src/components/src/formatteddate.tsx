import React from "react";
//import "./index.css";

// Define prop types for FormattedDate
interface FormattedDateProps {
  date: string | Date; // Allow both string and Date
  alt: string;
}

export default function FormattedDate({ date }: FormattedDateProps) {
  // Convert date to a Date object if it's a string
  const parsedDate = typeof date === "string" ? new Date(date) : date;

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const day = days[parsedDate.getDay()];
  const dayDate = parsedDate.getDate();
  const month = months[parsedDate.getMonth()];
  let hours: string | number = parsedDate.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes: string | number = parsedDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return (
    <div className="mb-5 mt-3 text-gray-700 font-medium">
      {day}, {dayDate} {month}, {hours}:{minutes}
    </div>
  );
}

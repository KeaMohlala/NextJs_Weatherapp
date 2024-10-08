import React from "react";
import "./index.css";

// Define prop types for FormattedDate
interface FormattedDateProps {
  date: Date;
  alt: string;
}

export default function FormattedDate({ date }: FormattedDateProps) {
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
    "Febuary",
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

  const day = days[date.getDay()];
  const dayDate = date.getDate();
  const month = months[date.getMonth()];
  let hours: string | number = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes: string | number = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return (
    <div className="mb-5 mt-3">
      {day}, {dayDate} {month}, {hours}:{minutes}
    </div>
  );
}

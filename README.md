# Next.js Weather App

## Overview

The **Next.js Weather App** is a web application that provides weather information based on user input. Built using Next.js, it leverages the power of server-side rendering and API routes to deliver a smooth user experience.

## Features

- User authentication (Login/Signup)
- View and manage favorite cities
- Fetch current weather details for selected cities
- Responsive design for mobile and desktop
- Easily customizable and extendable

## Project Structure

NextJs_Weatherapp/ ├── src/ │ ├── lib/ │ │ └── mongodb.js # MongoDB connection setup │ ├── pages/ │ │ ├── api/ │ │ │ ├── login.js # API route for user login │ │ │ ├── signup.js # API route for user signup │ │ │ ├── favorites.js # API route to manage favorites │ │ │ └── fetch-favorites.js # API route to fetch favorite weather data │ │ ├── login.tsx # Login page component │ │ ├── signup.tsx # Signup page component │ │ ├── index.tsx # Home page component │ │ └── weatherDetails.tsx # Weather details page component │ ├── components/ │ │ └── src/ │ │ ├── App.tsx # Main application component │ │ ├── weather.tsx # Weather display component │ │ ├── weathersearch.tsx # Weather search component │ │ ├── city.tsx # City display component │ │ ├── favouriteslist.tsx # Favorites list component │ │ ├── forecast.tsx # Forecast display component │ │ ├── weathericon.tsx # Weather icon component │ │ ├── formatteddate.tsx # Formatted date display component │ │ └── weathertemperature.tsx # Weather temperature display component ├── .env.local # Environment variables ├── package.json # Project dependencies and scripts └── README.md # Project documentation



## Installation

To run this project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/KeaMohlala/NextJs_Weatherapp
   cd NextJs_Weatherapp


2 Install the dependencies:
npm install

3 Set up your environment variables in the .env.local file. You may need to create this file based on the structure of .env.example.

4 Start the development server:
npm run dev

5 Open your browser and go to http://localhost:3000 to see the app in action.

Usage
Users can log in or sign up to access personalized weather information.
Once logged in, users can search for cities and view their current weather.
Users can also save their favorite cities for quick access.
Contributing
Feel free to fork the repository and submit pull requests. Contributions are welcome!

License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgments
Next.js
React
MongoDB


 6 Author : Keamogetse Mohlala (keamogetsemhll@gmail.com) and Daniel Egbuluese (danniwide.1981@gmail.com) 






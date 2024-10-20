//src/components/App.tsx: main component to render the weather app interface.
import Weather from "./weather";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import FavouritesList from "./favouriteslist";
import { DiGithubBadge } from "react-icons/di";
import { TiBookmark } from "react-icons/ti";

export default function App() {
  const router = useRouter(); //initialize the router to navigate user to different routes

  //retrieve token from local storage to verify if the user is logged in.
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null; //condition ensures this only runs on the client side
  const [favourites, setFavourites] = useState<string[]>([]);
  const [showFavourites, setShowFavourites] = useState(false);

  //retrieve list of cities from local storage and store in favourites state variable
  useEffect(() => {
    const storedFavourites = localStorage.getItem("favourites");
    if (storedFavourites) {
      setFavourites(JSON.parse(storedFavourites));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  //toggles the visibility of the FavouritesList component
  const handleBookmarkClick = () => {
    setShowFavourites(!showFavourites);
  };

  //adds or removes a city from the favourites array
  const handleFavouriteChange = (city: string) => {
    const updatedFavourites = favourites.includes(city) //condition to check if city is in fav list
      ? favourites.filter((fav) => fav !== city) //remove city
      : [...favourites, city]; //add city to list using spread operator

    setFavourites(updatedFavourites);
    //updated favourites saved back into localStorage after conversion to JSON string).
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
  };

  return (
    <div className="App bg-gradient-to-br from-purple-100 to-blue-100 min-h-screen flex flex-col items-center">
      <nav className="w-full p-4 bg-white shadow-md flex justify-between items-center">
        <div className="text-2xl text-gray-700 font-bold">Weather App</div>
        <div className="flex space-x-4">
          {!token ? (
            <>
              <button
                onClick={() => router.push("/login")}
                className="font-bold text-gray-600 px-4 py-2"
              >
                Login
              </button>
              <button
                onClick={() => router.push("/signup")}
                className="font-bold text-gray-600 px-4 py-2"
              >
                Sign Up
              </button>
            </>
          ) : (
            <div className="flex items-center">
              <div onClick={handleBookmarkClick} className="cursor-pointer">
                <TiBookmark size={30} />
              </div>
              <button
                onClick={handleLogout}
                className="border-4 border-red-200 rounded text-gray-600 px-4 py-2 font-bold"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      {showFavourites && (
        <FavouritesList
          favourites={favourites}
          onFavouriteChange={handleFavouriteChange}
        />
      )}

      <Weather
        defaultCity="Johannesburg"
        favourites={favourites}
        onFavouriteChange={handleFavouriteChange}
      />

      <small className="text-gray-600 mt-4">
        <a
          href="https://github.com/KeaMohlala/NextJs_Weatherapp"
          target="_blank"
          rel="noreferrer"
        >
          <DiGithubBadge size={30} />
        </a>
      </small>
    </div>
  );
}

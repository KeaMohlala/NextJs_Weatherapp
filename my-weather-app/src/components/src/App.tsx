import Weather from "./weather";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import FavouritesList from "./favouriteslist";
import { DiGithubBadge } from "react-icons/di";
import { TiBookmark } from "react-icons/ti";

export default function App() {
  const router = useRouter();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const [favourites, setFavourites] = useState<string[]>([]);
  const [showFavourites, setShowFavourites] = useState(false);

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

  const handleBookmarkClick = () => {
    setShowFavourites(!showFavourites);
  };

  const handleFavouriteChange = (city: string) => {
    const updatedFavourites = favourites.includes(city)
      ? favourites.filter((fav) => fav !== city)
      : [...favourites, city];

    setFavourites(updatedFavourites);
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

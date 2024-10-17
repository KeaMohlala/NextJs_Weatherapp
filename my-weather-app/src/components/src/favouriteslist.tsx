import React, { useState, useEffect } from "react";
import { TiHeartFullOutline, TiHeartOutline } from "react-icons/ti";

interface CityData {
  cityName: string;
  isFavourited: boolean;
  onFavouriteChange: (city: string) => void;
}

export default function City({
  cityName,
  isFavourited,
  onFavouriteChange,
}: CityData) {
  const [favourited, setFavourited] = useState(isFavourited);

  useEffect(() => {
    setFavourited(isFavourited);
  }, [isFavourited]);

  const toggleFavourite = () => {
    onFavouriteChange();
  };

  return (
    <div>
      <button onClick={toggleFavourite}>
        {favourited ? (
          <TiHeartFullOutline size={30} />
        ) : (
          <TiHeartOutline size={30} />
        )}
      </button>
    </div>
  );
}

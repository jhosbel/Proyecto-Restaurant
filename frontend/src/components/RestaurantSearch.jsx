import { useState } from "react";
import { searchRestaurants } from "../services/api";
import PlaceAutocomplete from "./PlaceAutocomplete";
import RestaurantCarousel from "./RestaurantCarousel";


const RestaurantSearch = () => {
  const [location, setLocation] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!location) {
      setError("Por favor, ingresa una ubicación.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Debes iniciar sesión para buscar restaurantes.");
        return;
      }
      await fetch(`${import.meta.env.VITE_APP_API_URL}/api/search/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ query: location }),
      });
      const response = await searchRestaurants(location, token);
      setRestaurants(response.data);
      setError("");
    } catch (err) {
      setError("Error al buscar restaurantes.");
      console.error(err);
    }
  };

  const translations = {
    Monday: "Lunes",
    Tuesday: "Martes",
    Wednesday: "Miércoles",
    Thursday: "Jueves",
    Friday: "Viernes",
    Saturday: "Sábado",
    Sunday: "Domingo",
    Closed: "Cerrado",
  };

  const handlePlaceSelected = (place) => {
    setLocation(`${place.lat},${place.lng}`);
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="mt-[5rem] sm:mt-[0]">Buscar Restaurantes</h2>
      <div className="flex sm:flex-row flex-col justify-center gap-8">
        <PlaceAutocomplete onPlaceSelected={handlePlaceSelected} />
        <button onClick={handleSearch}>Buscar</button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="flex justify-around gap-8">
        <div className="h-[400px] overflow-auto flex flex-col items-center w-[90vw] sm:w-[100vw]">
          {restaurants.map((restaurant, index) => (
            <div
              key={index}
              className="rounded w-[90vw] sm:w-[37vw] flex flex-col shadow-lg bg-[#0000008c] p-3 mb-4"
            >
              <RestaurantCarousel
                images={restaurant.images}
                restaurantId={index}
              />
              <div className="flex flex-col items-center justify-center">
                <h3 className="text-2xl font-medium">{restaurant.name}</h3>
                <p className="font-medium text-sky-500">
                  Dirección: {restaurant.address}
                </p>
                <p className="flex font-medium text-gray-600 dark:text-gray-400">
                  Rating: {restaurant.rating}
                </p>
                <ul>
                  <p>Horarios de atención:</p>
                  {restaurant?.openingHours.map((type, i) => {
                    const translatedType = Object.keys(translations).reduce(
                      (acc, key) => {
                        return acc.replace(key, translations[key]);
                      },
                      type
                    );
                    return (
                      <div key={i}>
                        <li>{translatedType}</li>
                      </div>
                    );
                  })}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantSearch;

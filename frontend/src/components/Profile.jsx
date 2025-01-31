import Layout from "./Layout";
import { useEffect, useState } from "react";

const Profile = () => {
  const [history, setHistory] = useState([]);

  const getPlaceName = async (lat, lng) => {
    try {
      const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
      if (!apiKey) {
        console.error("❌ API Key no está definida");
        return "Error: API Key no configurada";
      }
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;
      const response = await fetch(url);
      if (!response.ok) {
        console.error(
          "❌ Error en la respuesta de Google Maps:",
          response.status
        );
        return "Error obteniendo ubicación";
      }
      const data = await response.json();
      if (data.status === "OK" && data.results.length > 0) {
        return data.results[0].formatted_address;
      } else {
        console.warn(
          "⚠️ No se encontró dirección para estas coordenadas:",
          lat,
          lng
        );
        return "Ubicación desconocida";
      }
    } catch (error) {
      console.error("❌ Error obteniendo la ubicación", error);
      return "Error obteniendo ubicación";
    }
  };

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.warn("No hay token en localStorage");
          return;
        }
        const response = await fetch(
          `${import.meta.env.VITE_APP_API_URL}/api/search/history`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!response.ok) {
          console.error("Error en la respuesta del servidor:", response.status);
          return;
        }
        const data = await response.json();
        const historyWithPlaces = await Promise.all(
          data.map(async (search) => {
            if (search.query) {
              const [lat, lng] = search.query.split(",").map(Number);
              const placeName = await getPlaceName(lat, lng);
              return { ...search, placeName };
            }
            return search;
          })
        );

        const uniqueHistory = new Map();
        historyWithPlaces.forEach((search) => {
          uniqueHistory.set(search.placeName, search);
        });

        const filteredHistory = Array.from(uniqueHistory.values()).sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        setHistory(filteredHistory);
      } catch (err) {
        console.error("Error al obtener historial", err);
      }
    };
    fetchHistory();
  }, []);

  return (
    <Layout>
      <div className="flex flex-col gap-[5rem] sm:h-[60vh] h-[70vh] overflow-auto bg-[#000000a8] p-8 rounded-[10px]">
        <h1>Historial de busquedas</h1>
        <ul className="flex flex-col gap-[2rem]">
          {history.map((search, index) => (
            <li key={index} className="border-b-[1px]">
              {search.placeName || search.query} -{" "}
              {new Date(search.date).toLocaleString()}
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default Profile;

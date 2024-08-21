"use client";

import { useEffect, useState } from "react";
import { getCurrentLocation } from "@/utils/geolocation";
import { Coordinates, City } from "@/utils/types";
import { WeatherCard } from "@/components/WeatherCard";

export default function Home() {
  const [city, setCity] = useState<City | null>(null); // Inicializa con null
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLocation() {
      try {
        const location: Coordinates = await getCurrentLocation();

        // Crea un objeto City con las coordenadas obtenidas
        const newCity: City = {
          coordinates: location,
        };

        setCity(newCity); // Actualiza el estado con el nuevo objeto City
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    }

    fetchLocation();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return <WeatherCard city={city} />;
}

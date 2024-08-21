"use client";

import { useEffect, useState } from "react";
import { WeatherCard } from "@/components/WeatherCard";
import { City } from "@/utils/types";
import { NewCity } from "@/components/NewCity";
import { fetchCities } from "@/services/cities"; // Asegúrate de que la importación sea correcta

export default function Home() {
  // Estado para el modal
  const [open, setOpen] = useState<boolean>(false);

  // Estado para la lista de ciudades
  const [cities, setCities] = useState<City[]>([]);

  // Estado para el ID del usuario
  const [userId, setUserId] = useState<number | null>(null);

  // Cargar el ID del usuario desde el almacenamiento de sesión
  useEffect(() => {
    const storedUserId = sessionStorage.getItem("userId");
    if (storedUserId) {
      setUserId(Number(storedUserId));
    }
  }, []);

  // Función para abrir el modal
  function openModal() {
    setOpen(true);
  }

  // useEffect para cargar las ciudades cuando el userId cambia
  useEffect(() => {
    async function loadCities() {
      if (userId === null) return; // No hacer nada si el userId es null
      try {
        const data = await fetchCities(userId);
        setCities(data); // Actualiza el estado con las ciudades
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    }

    loadCities(); // Llama a la función para cargar las ciudades
  }, [userId, open]); // Dependencias: userId y open

  return (
    <>
      <div className="myCities">
        {cities.map((city) => (
          <WeatherCard key={city.id} city={city} />
        ))}
      </div>
      <NewCity open={open} setOpen={setOpen} />
      <button onClick={openModal} className="openNewCity">
        Add City
      </button>
    </>
  );
}

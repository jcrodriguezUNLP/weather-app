"use client";

import { useEffect, useRef, useState, FormEvent } from "react";
import { searchLocation } from "@/utils/geoCage";
import { Coordinates } from "@/utils/types";
import { createCity } from "@/services/cities";

interface NewCityProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function NewCity({ open, setOpen }: NewCityProps) {
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const storedUserId = sessionStorage.getItem("userId");
    if (storedUserId) {
      setUserId(Number(storedUserId));
    }
  }, []);
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // Estado de loading

  function handleClose() {
    const modal = modalRef.current;
    if (modal) {
      modal.close();
      setOpen(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true); // Activar el estado de loading

    const form = event.target as HTMLFormElement;
    const country = form.country.value;
    const state = form.state.value;
    const city = form.city.value;

    try {
      // Buscar la nueva ciudad
      const location: any = await searchLocation(city, state, country);

      // Crear un nuevo objeto City con las coordenadas
      const coordinates: Coordinates = {
        latitude: location.results[0].geometry.lat,
        longitude: location.results[0].geometry.lng,
      };

      // Crear la ciudad en la base de datos
      await createCity(userId, coordinates);

      // Cerrar el modal después de crear la ciudad
      handleClose();
    } catch (error) {
      console.error("Error adding city:", error);
    } finally {
      setLoading(false); // Desactivar el estado de loading
    }
  }

  useEffect(() => {
    const modal = modalRef.current;

    if (open && modal) {
      modal.showModal();
    } else if (modal) {
      modal.close();
    }
  }, [open]);

  return (
    <dialog className="newCity" ref={modalRef}>
      <h2>Agregar nueva ciudad</h2>

      <button onClick={handleClose} className="closeModal">
        Close
      </button>

      <form onSubmit={handleSubmit}>
        <label htmlFor="country">Country</label>
        <input type="text" id="country" name="country" required />

        <label htmlFor="state">State</label>
        <input type="text" id="state" name="state" required />

        <label htmlFor="city">City</label>
        <input type="text" id="city" name="city" required />

        <button type="submit" disabled={loading}>
          {loading ? "Cargando..." : "Agregar"}
        </button>
      </form>
    </dialog>
  );
}

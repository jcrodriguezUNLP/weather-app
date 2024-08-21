import { City, Coordinates } from "@/utils/types";

// Obtener todas las ciudades de un usuario específico
export async function fetchCities(userId: number): Promise<City[]> {
  try {
    const response = await fetch(`/api/postgres/cities?userId=${userId}`);
    if (!response.ok) {
      throw new Error("Error fetching cities");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching cities:", error);
    throw error;
  }
}

// Crear una nueva ciudad para un usuario específico
export async function createCity(
  userId: number,
  coordinates: Coordinates
): Promise<City> {
  try {
    const response = await fetch("/api/postgres/cities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, coordinates }),
    });

    if (!response.ok) {
      throw new Error("Failed to create city");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating city:", error);
    throw error;
  }
}

// Actualizar una ciudad existente de un usuario específico
export async function updateCity(
  id: number,
  userId: number,
  coordinates: Coordinates
): Promise<City> {
  try {
    const response = await fetch("/api/postgres/cities", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, userId, coordinates }),
    });

    if (!response.ok) {
      throw new Error("Failed to update city");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating city:", error);
    throw error;
  }
}

// Eliminar una ciudad de un usuario específico
export async function deleteCity(id: number, userId: number): Promise<void> {
  try {
    const response = await fetch("/api/postgres/cities", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, userId }),
    });

    if (!response.ok) {
      throw new Error("Failed to delete city");
    }
  } catch (error) {
    console.error("Error deleting city:", error);
    throw error;
  }
}

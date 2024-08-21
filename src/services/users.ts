// Definición del tipo Usuario
import {User} from '@/utils/types'

// Obtener todos los usuarios
export async function fetchUsers(): Promise<User[]> {
  try {
    const response = await fetch("/api/postgres/users");
    if (!response.ok) {
      throw new Error("Error fetching users");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

// Crear un nuevo usuario
// src/services/users.ts
export async function createUser(
  name: string,
  email: string,
  password: string
): Promise<User> {
  try {
    const response = await fetch("/api/postgres/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }), // Asegúrate de usar 'name' aquí
    });

    if (!response.ok) {
      throw new Error("Failed to create user");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}


// Actualizar un usuario existente
export async function updateUser(
  id: number,
  user: string,
  email: string,
  password: string
): Promise<User> {
  try {
    const response = await fetch("/api/postgres/users", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, user, email, password }),
    });

    if (!response.ok) {
      throw new Error("Failed to update user");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}

// Eliminar un usuario
export async function deleteUser(id: number): Promise<void> {
  try {
    const response = await fetch("/api/postgres/users", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      throw new Error("Failed to delete user");
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
}

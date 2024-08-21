"use client";

import {  Users } from "@/utils/types";
import { useEffect, useState } from "react";
import { fetchUsers } from "@/services/users";
import { CreateUserForm } from "@/components/CreateUserForm";

export default function Home() {
  const [users, setUsers] = useState<Users>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Función para obtener la lista de usuarios
    async function getUsers() {
      try {
        const fetchedUsers = await fetchUsers();
        setUsers(fetchedUsers);
      } catch (err) {
        setError("Failed to fetch users.");
      }
    }
    getUsers();
  }, []); // Solo se ejecuta una vez al montar el componente

  return (
    <>
      <div>
        <h1>Users List</h1>
        {error && <p>{error}</p>}
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <p>Id: {user.id}</p>{" "}
              <p>Username: {user.name}</p>{" "}
              {/* Asegúrate de que 'user.name' coincida con tu tipo User */}
              <p>Email: {user.email}</p>
              {/* Puedes omitir el password_hash si no es necesario mostrarlo */}
            </li>
          ))}
        </ul>
      </div>
      <CreateUserForm />
    </>
  );
}

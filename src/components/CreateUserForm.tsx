"use client";

import { FormEvent } from "react";
import { createUser } from "@/services/users";
import { User } from "@/utils/types";

export function CreateUserForm() {
  
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;

    const user: User = {
      name: form.name.value, // Cambiado de userName a name
      email: form.email.value,
      password: form.password.value,
    };

    try {
      const newUser = await createUser(user.name, user.email, user.password); // Asegúrate de esperar la respuesta
      console.log("User created:", newUser);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  }

  return (
    <>
      <h2>Agregar nuevo usuario</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" required />
        <label htmlFor="email">Email</label>
        <input type="text" id="email" name="email" required />
        <label htmlFor="password">Password</label>
        <input type="text" id="password" name="password" required />
        <button type="submit">Agregar</button>
      </form>
    </>
  );
}

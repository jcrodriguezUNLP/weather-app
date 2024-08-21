"use client";

import { useRouter } from "next/navigation";

export function Logout() {
  const router = useRouter();

  function handleLogout() {
    sessionStorage.removeItem("userId");
    router.push("/login"); // Redirigir a la página de inicio de sesión
  }

  return <button onClick={handleLogout}>Log Out</button>;
}

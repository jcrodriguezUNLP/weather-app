"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  function handleLogout() {
    sessionStorage.removeItem("userId");
    router.push("/logIn"); // Redirigir a la página de inicio de sesión
  }

  return <button onClick={handleLogout}>Log Out</button>;
}

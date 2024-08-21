"use client";

import { useState } from "react";
import Link from "next/link";

export function Header() {
  const [menuActive, setMenuActive] = useState(false);

  function toggleMenu() {
    setMenuActive(!menuActive);
  }

  return (
    <header>
      <Link href="/">Logo</Link>

      <div className="hambug" onClick={toggleMenu}>
        <div className={`barsContainer ${menuActive ? "active" : ""}`}>
          <div className={`bar bar1 ${menuActive ? "active" : ""}`}></div>
          <div className={`bar bar2 ${menuActive ? "active" : ""}`}></div>
          <div className={`bar bar3 ${menuActive ? "active" : ""}`}></div>
        </div>
      </div>

      <nav className={`menuDesplegable ${menuActive ? "active" : ""}`}>
        <ul>
          <li>
            <Link href="/myCities">My Cities</Link>
            <Link href="/users">Users</Link>
            <Link href="/logIn">Log In</Link>
            <Link href="/logOut">Log Out</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

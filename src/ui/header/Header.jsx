import React from "react";
import Navbar from "./Navbar";

export default function Header() {
  return (
    <header className="fixed w-full px-4 py-6 text-black z-50">
      <Navbar />
    </header>
  );
}

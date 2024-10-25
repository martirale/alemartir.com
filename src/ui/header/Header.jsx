import React from "react";
import Navbar from "./Navbar";

export default function Header() {
  return (
    <header className="fixed w-full px-4 py-3 bg-yellow text-black border-b-black border-b-[1px] z-50">
      <Navbar />
    </header>
  );
}

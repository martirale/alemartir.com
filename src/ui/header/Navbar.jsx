"use client";

import React, { useState, useEffect } from "react";
// import MonogramAM from "@logos/MonogramAM";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsStaggered, faXmark } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  function getMenuClasses() {
    let menuClasses = [];

    if (isOpen) {
      menuClasses = [
        "flex",
        "absolute",
        "bg-black",
        "text-yellow",
        "w-full",
        "flex-col",
        "top-[81px]",
        "left-0",
        "px-2",
        "py-5",
        "gap-5",
      ];
    } else {
      menuClasses = ["hidden", "md:flex"];
    }

    return menuClasses.join(" ");
  }

  // MENU LINKS
  const buttons = [
    {
      name: "Inicio",
      url: "/",
    },
  ];

  return (
    <nav className="md:p-0 md:flex md:justify-between md:items-center">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          {/* <MonogramAM className="fill-black w-[48px] h-[48px] md:w-[54px] md:h-[54px]" /> */}
        </Link>

        <div className={getMenuClasses()}>
          {buttons.map((button) => (
            <Link
              key={button.name}
              href={button.url}
              className="text-5xl mx-2 hover:underline md:pl-4"
            >
              <span>{button.name}</span>
            </Link>
          ))}
        </div>

        <div className="flex items-center md:hidden">
          <button
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            {isOpen ? (
              <FontAwesomeIcon icon={faXmark} className="text-black text-2xl" />
            ) : (
              <FontAwesomeIcon
                icon={faBarsStaggered}
                className="text-black text-xl"
              />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}

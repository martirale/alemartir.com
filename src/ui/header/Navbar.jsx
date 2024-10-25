"use client";

import React, { useState, useEffect } from "react";
import MonoAM from "@logos/MonoAM";
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
        "top-[75px]",
        "left-0",
        "pl-4",
        "py-5",
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
    <nav>
      <div className="mx-auto flex justify-between items-center">
        <Link href="/">
          <MonoAM className="fill-black w-[99px] h-[48px]" />
        </Link>

        <div className={getMenuClasses()}>
          {buttons.map((button) => (
            <Link
              key={button.name}
              href={button.url}
              className="text-4xl md:text-3xl hover:underline"
            >
              {button.name}
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

"use client";

import React, { useState, useEffect } from "react";
import MonoAM from "@logos/MonoAM";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsStaggered, faXmark } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { menuOptions } from "@ui/menuOptions";

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
        "py-4",
      ];
    } else {
      menuClasses = ["hidden", "md:flex"];
    }

    return menuClasses.join(" ");
  }

  const footerOptions = menuOptions.filter((option) => option.showHeader);

  return (
    <nav>
      <div className="mx-auto flex justify-between items-center">
        <Link href="/">
          <MonoAM className="fill-black w-[99px] h-[48px]" />
        </Link>

        <div className={getMenuClasses()}>
          {footerOptions.map((option) => (
            <Link
              key={option.name}
              href={option.url}
              target={option.target}
              rel="noopener noreferrer"
              className="md:uppercase text-3xl md:text-2xl hover:underline my-2 md:ml-8 md:my-0"
            >
              {option.name}
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

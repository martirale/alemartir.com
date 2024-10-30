import React from "react";
import Link from "next/link";
import { menuOptions } from "@ui/menuOptions";

export default function FooterMisc() {
  const footerOptions = menuOptions.filter((option) => option.showMisc);

  return (
    <div className="border-b md:border-r md:border-b-0 px-4 pt-4 pb-16">
      <div className="flex flex-col">
        {footerOptions.map((option) => (
          <span key={option.id} className="inline-block">
            <Link
              href={option.url}
              target={option.target}
              rel="noopener noreferrer"
              className="uppercase text-xl md:text-base mb-2 hover:underline"
            >
              {option.name}
            </Link>
          </span>
        ))}
      </div>
    </div>
  );
}

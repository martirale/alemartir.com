import React from "react";
import Link from "next/link";
import { menuOptions } from "@ui/menuOptions";

export default function FooterSections() {
  const footerOptions = menuOptions.filter((option) => option.showFooter);

  return (
    <div className="flex-1 border-b md:border-r md:border-b-0 px-4 pt-4 pb-24">
      {footerOptions.map((option) => (
        <Link
          key={option.name}
          href={option.url}
          className="uppercase hover:underline"
        >
          {option.name}
        </Link>
      ))}
    </div>
  );
}

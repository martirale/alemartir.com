"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Pagination = ({ currentPage, totalPages }) => {
  const pathname = usePathname();

  return (
    <div className="grid grid-cols-3 yellow-cursor">
      <Link
        href={currentPage > 1 ? `${pathname}?page=${currentPage - 1}` : "#"}
        className={`p-4 ${currentPage <= 1 ? "opacity-50 cursor-not-allowed" : "hover:underline"}`}
      >
        Anterior
      </Link>
      {[...Array(totalPages)].map((_, i) => (
        <Link
          key={i}
          href={`${pathname}?page=${i + 1}`}
          className={`px-8 py-4 ${
            currentPage === i + 1 ? "border-l border-r" : "hover:underline"
          }`}
        >
          {i + 1}
        </Link>
      ))}
      <Link
        href={
          currentPage < totalPages ? `${pathname}?page=${currentPage + 1}` : "#"
        }
        className={`p-4 ${currentPage >= totalPages ? "opacity-50 cursor-not-allowed" : "hover:underline"}`}
      >
        Siguiente
      </Link>
    </div>
  );
};

export default Pagination;

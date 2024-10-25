import React from "react";
import Link from "next/link";
import MonoAM from "@logos/MonoAM";

export default function FooterBrand() {
  return (
    <div className="flex-1 border-b md:border-r md:border-b-0 px-4 pt-4 pb-24">
      <div className="flex flex-col">
        <Link href="/" className="mb-8">
          <MonoAM className="fill-black w-[149px] h-[72px]" />
        </Link>

        <p className="uppercase">
          Diseñador gráfico publicitario y creador de contenido digital para
          redes sociales
        </p>
      </div>
    </div>
  );
}

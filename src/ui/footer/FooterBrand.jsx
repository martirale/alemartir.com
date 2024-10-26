import React from "react";
import MonoAM from "@logos/MonoAM";

export default function FooterBrand() {
  return (
    <div className="flex-1 md:flex-[25%] border-b md:border-r md:border-b-0 px-4 pt-4 pb-16">
      <div className="flex flex-col">
        <MonoAM className="fill-black w-[149px] h-[72px] mb-8" />

        <p className="uppercase text-base md:text-sm">
          Diseñador gráfico publicitario y creador de contenido digital para
          redes sociales
        </p>
      </div>
    </div>
  );
}

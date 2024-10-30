import React from "react";
import { getHomeHero } from "@lib/api";
import Image from "next/image";
import ContentRenderer from "@ui/ContentRenderer";

export default async function HomeHero() {
  const homeHeroData = await getHomeHero();

  const { title, cover, quote } = homeHeroData;
  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-4 w-full border-b">
        <div className="col-span-1 md:border-r order-2 md:order-1">
          <div className="px-4 pt-4 md:pt-0 text-center md:text-left place-content-end h-full">
            <h2 className="mb-4">{title}</h2>

            <ContentRenderer blocks={quote} />
          </div>
        </div>

        <div className="col-span-1 md:col-span-3 h-[480px] md:min-h-[calc(100dvh-75px)] order-1 md:order-2 border-b md:border-b-0">
          <Image
            src={`${process.env.STRAPI_API_URL}${cover.url}`}
            alt={cover.url}
            width={1920}
            height={1080}
            className="w-full h-full object-cover yellow-cursor"
          />
        </div>
      </section>
    </>
  );
}

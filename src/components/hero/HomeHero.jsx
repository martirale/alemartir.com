import React from "react";
import { getAbout } from "@lib/api";
import Image from "next/image";

export default async function HomeHero() {
  const aboutData = await getAbout();

  const { profile } = aboutData;
  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-4 w-full border-b">
        <div className="col-span-1 md:border-r order-2 md:order-1 p-4 text-center">
          <p>Lorem ipsum 1.</p>
        </div>

        <div className="col-span-1 md:col-span-3 md:-mt-[75px] md:pt-[75px] h-[550px] md:h-dvh order-1 md:order-2">
          <Image
            src={`${process.env.STRAPI_API_URL}${profile.url}`}
            alt={profile.url}
            width={1920}
            height={1080}
            className="w-full h-full object-cover"
          />
        </div>
      </section>
    </>
  );
}

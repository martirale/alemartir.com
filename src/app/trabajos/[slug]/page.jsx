import React from "react";
import { getGlobal, getAbout } from "@lib/api";
import Image from "next/image";
import ContentRenderer from "@ui/ContentRenderer";

export async function generateMetadata() {
  try {
    const globalData = await getGlobal();
    const { sitename, description } = globalData;
    const aboutData = await getAbout();
    const { title } = aboutData;

    if (!title) {
      return undefined;
    }

    return {
      title: `${title} | ${sitename}`,
      description: `${description}`,
      openGraph: {
        title: `${title} | ${sitename}`,
        description: `${description}`,
        url: "https://alemartir.com/trabajos",
        type: "website",
        images: [
          {
            url: "https://alemartir.com/alemartir-cover.webp",
            width: 1200,
            height: 630,
            alt: `${sitename}`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${title} | ${sitename}`,
        description: `${description}`,
        images: ["https://alemartir.com/alemartir-cover.webp"],
      },
      canonical: "https://alemartir.com/trabajos",
    };
  } catch (error) {
    console.error("Error fetching works content:", error);

    return undefined;
  }
}

export default async function WorkPage() {
  try {
    const aboutData = await getAbout();

    const { title, description, profile } = aboutData;
    return (
      <>
        <h1>{title}</h1>

        <div className="flex flex-col md:flex-row w-full">
          {/* MEDIA CONTENT */}
          <section className="flex-1 md:flex-[50%] border-b md:border-r md:border-b-0">
            <div className="w-full">
              <Image
                src={`${process.env.STRAPI_API_URL}${profile.url}`}
                alt={profile.url}
                width={1920}
                height={1080}
              />
            </div>
          </section>

          {/* DESCRIPTION */}
          <section className="flex-1 md:flex-[25%] border-b md:border-r md:border-b-0">
            <div className="px-4 py-8 md:p-8">
              <ContentRenderer blocks={description} />
            </div>
          </section>

          {/* PROJECT INFO */}
          <section className="flex-1 md:flex-[25%]">
            <div className="px-4 py-8 md:p-8">
              <ContentRenderer blocks={description} />
            </div>
          </section>
        </div>
      </>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return (
      <div>
        <h1>Error fetching data</h1>
        <p>{error.message}</p>
      </div>
    );
  }
}

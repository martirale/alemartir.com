import React from "react";
import { getGlobal, getAbout, getWorks } from "@lib/api";
import Image from "next/image";
import WorkCard from "@components/WorkCard";

export async function generateMetadata() {
  try {
    const globalData = await getGlobal();
    const { sitename, description } = globalData;

    return {
      title: `Trabajos | ${sitename}`,
      description: `${description}`,
      openGraph: {
        title: `Trabajos | ${sitename}`,
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
        title: `Trabajos | ${sitename}`,
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

export default async function WorksPage() {
  try {
    const worksData = await getWorks();

    return (
      <>
        <h1>{title}</h1>

        <div className="flex flex-col md:flex-row w-full">
          {worksData.map((work) => (
            <WorkCard
              key={work.slug}
              title={work.title}
              client={work.client}
              discipline={work.discipline}
              cover={work.cover}
            />
          ))}
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

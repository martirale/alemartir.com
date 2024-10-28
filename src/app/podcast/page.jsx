import React from "react";
import { getGlobal } from "@lib/api";
import PodcastPlayer from "@components/podcast/PodcastPlayer";

export async function generateMetadata() {
  try {
    const globalData = await getGlobal();
    const { sitename, description } = globalData;

    return {
      title: `Café Creativo Podcast | ${sitename}`,
      description: `${description}`,
      openGraph: {
        title: `Café Creativo Podcast | ${sitename}`,
        description: `${description}`,
        url: "https://alemartir.com/podcast",
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
        title: `Café Creativo Podcast | ${sitename}`,
        description: `${description}`,
        images: ["https://alemartir.com/alemartir-cover.webp"],
      },
      canonical: "https://alemartir.com/podcast",
    };
  } catch (error) {
    console.error("Error fetching privacy content:", error);

    return undefined;
  }
}

export default function PodcastPage() {
  return (
    <>
      <h1>Podcast</h1>

      <PodcastPlayer />
    </>
  );
}

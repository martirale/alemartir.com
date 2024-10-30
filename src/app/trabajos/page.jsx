import React from "react";
import { getGlobal, getWorks } from "@lib/api";
import WorkCard from "@components/WorkCard";
import Pagination from "@components/Pagination";

export async function generateMetadata() {
  try {
    const globalData = await getGlobal();
    const { sitename, description, cover } = globalData;

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
            url: `${process.env.STRAPI_API_URL}${cover.url}`,
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
        images: [`${process.env.STRAPI_API_URL}${cover.url}`],
      },
      canonical: "https://alemartir.com/trabajos",
    };
  } catch (error) {
    console.error("Error fetching works content:", error);

    return undefined;
  }
}

export default async function WorksPage({ searchParams }) {
  try {
    const currentPage = Number(searchParams.page) || 1;
    const { data: worksData, meta } = await getWorks();

    return (
      <>
        <h1>Trabajos</h1>

        <div className="grid grid-cols-1 w-full p-4 border-b">
          <div className="text-center">
            <h2>Trabajos</h2>
          </div>
        </div>

        <div className="overflow-hidden grid grid-cols-1 md:grid-cols-4 w-full">
          {worksData.map((work, index) => (
            <WorkCard
              key={work.id}
              title={work.title}
              slug={work.slug}
              client={work.client}
              disciplines={work.disciplines}
              cover={work.cover}
              isLastInRow={(index + 1) % 4 === 0}
            />
          ))}
        </div>

        {/* PAGINATION */}
        <div className="grid grid-cols-1 w-full bg-black text-yellow inverse-select">
          <div className="text-center">
            <Pagination
              currentPage={meta.pagination.page}
              totalPages={meta.pagination.pageCount}
            />
          </div>
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

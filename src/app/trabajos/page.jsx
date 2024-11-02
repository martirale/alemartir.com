import React from "react";
import { getGlobal, getWorks, getDisciplines } from "@lib/api";
import WorkCard from "@components/WorkCard";
import Pagination from "@components/Pagination";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

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
    const disciplineParam = searchParams.discipline || "all";

    const { data: worksData, meta } = await getWorks(currentPage);
    const disciplines = await getDisciplines();

    const filteredWorks =
      disciplineParam === "all"
        ? worksData
        : worksData.filter((work) =>
            work.disciplines?.some((d) => d.title === disciplineParam)
          );

    return (
      <>
        <h1>Trabajos</h1>

        {/* FILTER */}
        <div className="hidden md:flex md:gap-4 md:p-4 md:border-b md:justify-center">
          <Link href="/trabajos?discipline=all" className="font-bold uppercase">
            <FontAwesomeIcon icon={faFilter} className="w-4 h-4 mr-4" />
            Todos
          </Link>
          {disciplines.map((discipline) => (
            <Link
              key={discipline.id}
              href={`/trabajos?discipline=${discipline.title}`}
              className="font-bold uppercase"
            >
              {discipline.title}
            </Link>
          ))}
        </div>

        {/* WORKS RENDERED */}
        <div className="overflow-hidden grid grid-cols-1 md:grid-cols-4 w-full">
          {filteredWorks.map((work, index) => (
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
        <div className="grid grid-cols-1 w-full -m-[1px]">
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

import React from "react";
import { getWorks } from "@lib/api";
import Link from "next/link";
import WorkCard from "@components/WorkCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default async function WorksSection() {
  try {
    const { data: worksData } = await getWorks();
    const limitedWorksData = worksData.slice(0, 4);

    return (
      <>
        <section>
          <div className="flex flex-col md:flex-row w-full items-center p-4 border-b">
            <div className="flex-1 text-center">
              <h2>Trabajos</h2>
            </div>
          </div>

          <div className="flex flex-col md:flex-row w-full">
            {limitedWorksData.map((work) => (
              <WorkCard
                key={work.id}
                title={work.title}
                slug={work.slug}
                client={work.client}
                discipline={work.discipline}
                cover={work.cover}
              />
            ))}
          </div>
        </section>

        <Link href="/trabajos">
          <div className="flex flex-col md:flex-row w-full items-center p-4 bg-black text-yellow hover:underline inverse-select">
            <div className="flex-1 text-center">
              <span className="text-xl uppercase">
                Todos los trabajos <FontAwesomeIcon icon={faArrowRight} />
              </span>
            </div>
          </div>
        </Link>
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

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
          <div className="grid grid-cols-1 w-full p-4 border-b">
            <div className="text-center md:mt-1">
              <h2>Trabajos</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 w-full">
            {limitedWorksData.map((work, index) => (
              <WorkCard
                key={work.id}
                index={index}
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
          <div className="grid grid-cols-1 w-full p-4 bg-black text-yellow hover:underline inverse-select">
            <div className="text-center">
              <span className="text-xl uppercase">
                Todos los trabajos{" "}
                <FontAwesomeIcon icon={faArrowRight} className="w-5 h-5" />
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

import React from "react";
import { getWorks } from "@lib/api";
import WorkCard from "@components/WorkCard";

export default async function WorksSection() {
  try {
    const { data: worksData } = await getWorks();

    return (
      <section>
        <div className="flex flex-col md:flex-row w-full items-center p-4 border-b">
          <div className="flex-1 text-center">
            <h2>Trabajos</h2>
          </div>
        </div>

        <div className="flex flex-col md:flex-row w-full">
          {worksData.map((work) => (
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

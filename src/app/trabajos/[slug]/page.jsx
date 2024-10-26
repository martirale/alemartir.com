import React from "react";
import { getGlobal, getWorkBySlug } from "@lib/api";
import ContentRenderer from "@ui/ContentRenderer";

export async function generateMetadata({ params }) {
  try {
    const globalData = await getGlobal();
    const { sitename, description } = globalData;
    const workData = await getWorkBySlug(params.slug);
    const { title, slug } = workData;

    if (!title) {
      return undefined;
    }

    return {
      title: `${title} | ${sitename}`,
      description: `${description}`,
      openGraph: {
        title: `${title} | ${sitename}`,
        description: `${description}`,
        url: `https://alemartir.com/trabajos/${slug}`,
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
      canonical: `https://alemartir.com/trabajos/${slug}`,
    };
  } catch (error) {
    console.error("Error fetching works content:", error);

    return undefined;
  }
}

export default async function WorkPage({ params }) {
  try {
    const work = await getWorkBySlug(params.slug);

    const {
      title,
      description,
      client,
      campaign,
      agency,
      country,
      discipline,
      creative,
      strategy,
      lead,
      design,
      copywriting,
      illustration,
      animation,
      photo,
      team,
    } = work;
    return (
      <>
        <h1>{title}</h1>

        <div className="flex flex-col md:flex-row w-full items-center p-4 border-b">
          <div className="flex-1 text-center">
            <h2>{title}</h2>
          </div>
        </div>

        <div className="flex flex-col md:flex-row w-full md:min-h-[calc(100vh-50%)]">
          {/* MEDIA CONTENT */}
          <section className="flex-1 md:flex-[50%] border-b md:border-r md:border-b-0">
            <p>Lorem ipsum.</p>
          </section>

          {/* DESCRIPTION */}
          <section className="flex-1 md:flex-[25%] border-b md:border-r md:border-b-0">
            <div className="px-4 py-8">
              <ContentRenderer blocks={description} />
            </div>
          </section>

          {/* PROJECT INFO */}
          <section className="flex-1 md:flex-[25%]">
            <div className="px-4 py-8">
              <ul>
                {client && (
                  <li>
                    <span className="font-bold">Cliente:</span> {client}
                  </li>
                )}
                {campaign && (
                  <li>
                    <span className="font-bold">Campaña:</span> {campaign}
                  </li>
                )}
                {agency && (
                  <li>
                    <span className="font-bold">Agencia:</span> {agency}
                  </li>
                )}
                {country && (
                  <li>
                    <span className="font-bold">País:</span> {country}
                  </li>
                )}
                {discipline && (
                  <li>
                    <span className="font-bold">Disciplina:</span> {discipline}
                  </li>
                )}
                {creative && (
                  <li>
                    <span className="font-bold">Dirección creativa:</span>{" "}
                    {creative}
                  </li>
                )}
                {strategy && (
                  <li>
                    <span className="font-bold">Estrategia:</span> {strategy}
                  </li>
                )}
                {lead && (
                  <li>
                    <span className="font-bold">Diseñador principal:</span>{" "}
                    {lead}
                  </li>
                )}
                {design && (
                  <li>
                    <span className="font-bold">Diseño:</span> {design}
                  </li>
                )}
                {copywriting && (
                  <li>
                    <span className="font-bold">Copywriting:</span>{" "}
                    {copywriting}
                  </li>
                )}
                {illustration && (
                  <li>
                    <span className="font-bold">Ilustración:</span>{" "}
                    {illustration}
                  </li>
                )}
                {animation && (
                  <li>
                    <span className="font-bold">Animación:</span> {animation}
                  </li>
                )}
                {photo && (
                  <li>
                    <span className="font-bold">Fotografía:</span> {photo}
                  </li>
                )}
                {team && (
                  <li>
                    <span className="font-bold">Equipo de trabajo:</span> {team}
                  </li>
                )}
              </ul>
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
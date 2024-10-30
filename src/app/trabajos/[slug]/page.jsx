import React from "react";
import { getGlobal, getWorkBySlug } from "@lib/api";
import Image from "next/image";
import Link from "next/link";
import ContentRenderer from "@ui/ContentRenderer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export async function generateMetadata({ params }) {
  try {
    const globalData = await getGlobal();
    const { sitename, description } = globalData;
    const workData = await getWorkBySlug(params.slug);
    const { title, slug, cover } = workData;

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
            url: `${process.env.STRAPI_API_URL}${cover.url}`,
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
        images: [`${process.env.STRAPI_API_URL}${cover.url}`],
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
      disciplines,
      creative,
      strategy,
      lead,
      design,
      copywriting,
      illustration,
      animation,
      photo,
      team,
      images,
    } = work;
    return (
      <>
        <h1>{title}</h1>

        <div className="grid grid-cols-1 w-full p-4 border-b">
          <div className="text-center md:mt-1">
            <h2>{title}</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 w-full border-b">
          {/* MEDIA CONTENT */}
          <section className="col-span-1 md:col-span-3 border-b md:border-r md:border-b-0">
            {images.map((image) => (
              <div key={image.id} className="w-full">
                <Image
                  src={`${process.env.STRAPI_API_URL}${image.url}`}
                  alt={image.alternativeText}
                  width={1920}
                  height={1080}
                  className="w-full h-auto yellow-cursor"
                />
              </div>
            ))}
          </section>

          {/* PROJECT INFO */}
          <section className="col-span-1">
            <div className="px-4 py-8 border-b">
              <ContentRenderer blocks={description} />
            </div>

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
                {disciplines && (
                  <li>
                    <span className="font-bold">Disciplina:</span>{" "}
                    {disciplines && disciplines.length > 0
                      ? disciplines
                          .map((discipline) => discipline.title)
                          .join(", ")
                      : "No especificado"}
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

        {/* BACK WORKS */}
        <Link href="/trabajos">
          <div className="grid grid-cols-1 w-full p-4 bg-black text-yellow hover:underline inverse-select yellow-cursor">
            <div className="text-center">
              <span className="text-xl uppercase">
                <FontAwesomeIcon icon={faArrowLeft} className="w-5 h-5" /> Otros
                trabajos
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

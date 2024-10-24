import React from "react";
import { getGlobal, getPrivacy } from "@lib/api";
import ContentRenderer from "@ui/ContentRenderer";

export async function generateMetadata() {
  try {
    const globalData = await getGlobal();
    const { sitename, description } = globalData;
    const privacyData = await getPrivacy();
    const { title } = privacyData;

    if (!title) {
      return undefined;
    }

    return {
      title: `${title} | ${sitename}`,
      description: `${description}`,
      openGraph: {
        title: `${title} | ${sitename}`,
        description: `${description}`,
        url: "https://alemartir.com/privacidad",
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
      canonical: "https://alemartir.com/privacidad",
    };
  } catch (error) {
    console.error("Error fetching privacy content:", error);

    return undefined;
  }
}

export default async function PrivacyPage() {
  try {
    const privacyData = await getPrivacy();

    const { title, date, content } = privacyData;
    const formattedDate = date
      ? new Intl.DateTimeFormat("es-ES", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }).format(new Date(date))
      : "Fecha no disponible";

    return (
      <>
        <h1>{title}</h1>

        <section className="flex justify-center">
          <div className="flex flex-col w-full md:w-6/12">
            <div>
              <h2 className="font-extrabold text-5xl pb-16 md:text-7xl">
                {title}
              </h2>

              <div
                href="/patrocinado"
                target="_blank"
                className="bg-black text-yellow mb-8 py-1 px-5 text-xs rounded-full inline-block"
              >
                <p className="font-bold uppercase">
                  Actualizado: {formattedDate}
                </p>
              </div>

              <ContentRenderer blocks={content} />
            </div>
          </div>
        </section>
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

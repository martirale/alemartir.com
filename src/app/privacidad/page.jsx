import React from "react";
import { getGlobal, getPrivacy } from "@lib/api";
import ContentRenderer from "@ui/ContentRenderer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate } from "@fortawesome/free-solid-svg-icons";

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

        <div className="flex flex-col md:flex-row w-full">
          <section className="flex-1 md:flex-[50%] border-b md:border-r md:border-b-0">
            <div className="px-4 py-8">
              <h2>{title}</h2>

              <div
                className="bg-black text-yellow mt-8 py-1 px-5 text-xs rounded-full inline-block"
                title={`Política actualizada el ${formattedDate}`}
              >
                <p className="uppercase">
                  <FontAwesomeIcon icon={faRotate} className="w-3 h-3 mr-2" />
                  {formattedDate}
                </p>
              </div>
            </div>
          </section>

          <section className="flex-1 md:flex-[50%]">
            <div className="p-4 md:py-8">
              <ContentRenderer blocks={content} />
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

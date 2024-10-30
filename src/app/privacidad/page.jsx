import React from "react";
import { getGlobal, getPrivacy } from "@lib/api";
import ContentRenderer from "@ui/ContentRenderer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck } from "@fortawesome/free-solid-svg-icons";

export async function generateMetadata() {
  try {
    const globalData = await getGlobal();
    const { sitename, description, cover } = globalData;
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

        <div className="grid grid-cols-1 md:grid-cols-2 w-full">
          <section className="col-span-1 border-b md:border-r md:border-b-0">
            <div className="px-4 py-8">
              <h2 className="text-4xl md:text-5xl">{title}</h2>

              <div
                className="bg-black text-yellow mt-8 py-1 px-3 text-xs rounded-full inline-block"
                title={`Política actualizada el ${formattedDate}`}
              >
                <p className="uppercase">
                  <FontAwesomeIcon
                    icon={faCalendarCheck}
                    className="w-3 h-3 mr-2"
                  />
                  {formattedDate}
                </p>
              </div>
            </div>
          </section>

          <section className="col-span-1">
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

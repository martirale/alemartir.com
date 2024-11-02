import React from "react";
import { getGlobal, getAbout } from "@lib/api";
import Image from "next/image";
import ContentRenderer from "@ui/ContentRenderer";

export async function generateMetadata() {
  try {
    const globalData = await getGlobal();
    const { sitename, description, cover } = globalData;
    const aboutData = await getAbout();
    const { title } = aboutData;

    if (!title) {
      return undefined;
    }

    return {
      title: `${title} | ${sitename}`,
      description: `${description}`,
      openGraph: {
        title: `${title} | ${sitename}`,
        description: `${description}`,
        url: "https://alemartir.com/alejandro",
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
      canonical: "https://alemartir.com/alejandro",
    };
  } catch (error) {
    console.error("Error fetching about content:", error);

    return undefined;
  }
}

export default async function AboutPage() {
  try {
    const aboutData = await getAbout();

    const {
      title,
      description,
      profile,
      email,
      phone,
      short,
      agencies,
      logos,
    } = aboutData;
    return (
      <>
        <h1>{title}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 w-full">
          <div className="col-span-1 border-b md:border-r md:border-b-0">
            <div className="w-full aspect-w-1 aspect-h-1">
              <Image
                src={`${process.env.STRAPI_API_URL}${profile.url}`}
                alt={profile.url}
                width={1920}
                height={1080}
                className="w-full h-full object-cover yellow-cursor"
              />
            </div>
          </div>

          {/* ABOUT CONTENT */}
          <section className="col-span-1">
            <div className="w-full p-4 border-b">
              <h2 className="text-center">Alejandro Mártir</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 border-b">
              <div className="col-span-1 border-b md:border-b-0 md:border-r p-4">
                <h3 className="text-sm uppercase mb-4">Experiencia en:</h3>
                <ContentRenderer blocks={short} />
              </div>

              <div className="col-span-1 p-4">
                <h3 className="text-sm uppercase mb-4">Agencias:</h3>
                <ContentRenderer blocks={agencies} />
              </div>
            </div>

            <div className="grid grid-cols-1">
              <h3 className="text-sm uppercase col-span-4 text-center p-2 border-b">
                Marcas con las que he trabajado:
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4">
                {logos.map((logo, index) => (
                  <div
                    key={logo.id}
                    className={`p-4 border-b ${
                      index % 2 !== 1 ? "border-r" : ""
                    } ${index % 4 !== 3 ? "md:border-r" : "md:border-r-0"}`}
                  >
                    <Image
                      src={`${process.env.STRAPI_API_URL}${logo.url}`}
                      alt={logo.alternativeText}
                      width={1920}
                      height={1080}
                      className="w-full h-auto"
                    />
                  </div>
                ))}
              </div>
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

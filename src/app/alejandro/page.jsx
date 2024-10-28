import React from "react";
import { getGlobal, getAbout } from "@lib/api";
import Image from "next/image";
import Link from "next/link";
import ContentRenderer from "@ui/ContentRenderer";
import SocialLinks from "@components/SocialLinks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelopeOpen } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

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

    const { title, description, profile, email, phone } = aboutData;
    return (
      <>
        <h1>{title}</h1>

        <div className="flex flex-col md:flex-row w-full">
          <div className="flex-1 md:flex-[50%] border-b md:border-r md:border-b-0">
            <div className="w-full aspect-w-1 aspect-h-1">
              <Image
                src={`${process.env.STRAPI_API_URL}${profile.url}`}
                alt={profile.url}
                width={1920}
                height={1080}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* ABOUT CONTENT */}
          <section className="flex-1 md:flex-[50%]">
            <div className="flex w-full items-center justify-center p-4 border-b">
              <h2 className="text-center mt-2">Alejandro Mártir</h2>
            </div>

            <div className="px-4 py-8 border-b">
              <ContentRenderer blocks={description} />
            </div>

            <div className="border-b">
              <SocialLinks />
            </div>
          </section>
        </div>

        {/* CONTACTS */}
        <section className="flex flex-col md:flex-row w-full items-center p-4 bg-black text-yellow inverse-select">
          <div className="flex-1 text-center mb-8 md:mb-0">
            <h3 className="text-xl uppercase">¡Contáctame!</h3>
          </div>

          <div className="flex-1 text-center mb-2 md:mb-0">
            <Link href={email} className="text-xl uppercase hover:underline">
              <FontAwesomeIcon
                icon={faEnvelopeOpen}
                className="w-4 h-4 mr-2 align-baseline"
              />
              Correo
            </Link>
          </div>

          <div className="flex-1 text-center">
            <Link
              href={phone}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl uppercase hover:underline"
            >
              <FontAwesomeIcon
                icon={faWhatsapp}
                className="w-5 h-5 mr-2 align-middle"
              />
              WhatsApp
            </Link>
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

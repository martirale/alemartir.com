import React from "react";
import { getGlobal, getAbout } from "@lib/api";
import Image from "next/image";
import Link from "next/link";
import ContentRenderer from "@ui/ContentRenderer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelopeOpen } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

export async function generateMetadata() {
  try {
    const globalData = await getGlobal();
    const { sitename, description } = globalData;
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
          {/* ABOUT CONTENT */}
          <section className="flex-1 border-b md:border-r md:border-b-0">
            <div className="w-full aspect-w-1 aspect-h-1 border-b">
              <Image
                src={`${process.env.STRAPI_API_URL}${profile.url}`}
                alt={profile.url}
                width={1920}
                height={1080}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="px-4 py-8 md:p-8">
              <ContentRenderer blocks={description} />
            </div>
          </section>

          {/* CONTACT FORM */}
          <section className="flex-1"></section>
        </div>

        {/* OTHER CONTACTS */}
        <div className="flex flex-col md:flex-row w-full items-center p-8 bg-black text-yellow">
          <div className="flex-1 text-center mb-8 md:mb-0">
            <h3 className="text-xl uppercase">Otras formas de contacto:</h3>
          </div>

          <div className="flex-1 text-center mb-2 md:mb-0">
            <Link
              href="mailto:hola@alemartir.com"
              className="text-xl uppercase hover:underline"
            >
              <FontAwesomeIcon
                icon={faEnvelopeOpen}
                className="w-4 h-4 mr-2 align-baseline"
              />
              Correo
            </Link>
          </div>

          <div className="flex-1 text-center">
            <Link
              href="https://wa.me/message/ZW5NRUU3HCGUO1"
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

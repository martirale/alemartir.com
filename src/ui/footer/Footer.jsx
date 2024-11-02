import React from "react";
import { getAbout } from "@lib/api";
import Link from "next/link";
import FooterBrand from "./FooterBrand";
import FooterSections from "./FooterSections";
import FooterMisc from "./FooterMisc";
import FooterCopyright from "./FooterCopyright";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelopeOpen } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

export default async function Footer() {
  try {
    const aboutData = await getAbout();

    const { email, phone } = aboutData;
    return (
      <>
        {/* CONTACTS */}
        <section className="grid grid-cols-1 md:grid-cols-4 w-full p-4 bg-black text-yellow inverse-select yellow-cursor">
          <div className="text-center mb-8 md:mb-0">
            <h3 className="text-xl uppercase">¡Contáctame!</h3>
          </div>

          <div className="text-center mb-2 md:mb-0">
            <Link href={email} className="text-xl uppercase hover:underline">
              <FontAwesomeIcon
                icon={faEnvelopeOpen}
                className="w-4 h-4 mr-2 align-baseline"
              />
              Correo
            </Link>
          </div>

          <div className="text-center mb-2 md:mb-0">
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

          <div className="text-center">
            <Link
              href="https://www.instagram.com/itsmrtr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl uppercase hover:underline"
            >
              <FontAwesomeIcon
                icon={faInstagram}
                className="w-5 h-5 mr-2 align-middle"
              />
              Instagram
            </Link>
          </div>
        </section>

        <footer className="grid grid-cols-1 md:grid-cols-4 w-full bg-yellow text-black border-t">
          <FooterBrand />
          <FooterSections />
          <FooterMisc />
          <FooterCopyright />
        </footer>
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

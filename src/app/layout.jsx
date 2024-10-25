import React from "react";
import "./globals.css";
import { getGlobal } from "@lib/api";
import Header from "@ui/header/Header";
import Footer from "@ui/footer/Footer";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata() {
  try {
    const globalData = await getGlobal();
    const { sitename, description } = globalData;

    return {
      title: `${sitename}`,
      description: `${description}`,
      openGraph: {
        title: `${sitename}`,
        description: `${description}`,
        url: "https://alemartir.com",
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
        title: `${sitename}`,
        description: `${description}`,
        images: ["https://alemartir.com/alemartir-cover.webp"],
      },
      canonical: "https://alemartir.com",
      icons: {
        icon: "/favicon.png",
      },
    };
  } catch (error) {
    console.error("Error fetching privacy content:", error);

    return undefined;
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={montserrat.className}>
      <body className="bg-yellow text-black custom-vh">
        <Header />

        <main className="w-full mx-auto pt-[75px]">{children}</main>

        <Footer />
      </body>
    </html>
  );
}

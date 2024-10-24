import React from "react";
import "./globals.css";

export const metadata = {
  title: "Alejandro Mártir",
  description:
    "Soy Alejandro Mártir, diseñador gráfico publicitario y creador de contenido audiovisual. Autor de Creatyum Media y host del podcast Café Creativo.",
  openGraph: {
    title: "Alejandro Mártir",
    description:
      "Soy Alejandro Mártir, diseñador gráfico publicitario y creador de contenido audiovisual. Autor de Creatyum Media y host del podcast Café Creativo.",
    url: "https://alemartir.com",
    type: "website",
    images: [
      {
        url: "https://alemartir.com/alemartir-cover.webp",
        width: 1200,
        height: 630,
        alt: "Alejandro Mártir",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alejandro Mártir",
    description:
      "Soy Alejandro Mártir, diseñador gráfico publicitario y creador de contenido audiovisual. Autor de Creatyum Media y host del podcast Café Creativo.",
    images: ["https://alemartir.com/alemartir-cover.webp"],
  },
  canonical: "https://alemartir.com",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-yellow text-black custom-vh">
        <main className="w-full max-w-xl md:max-w-3xl lg:max-w-screen-2xl mx-auto pt-24 md:pt-28">
          {children}
        </main>
      </body>
    </html>
  );
}

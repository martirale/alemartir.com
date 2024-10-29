import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function WorkCard({
  title,
  slug,
  client,
  discipline,
  cover,
  isLastInRow,
}) {
  return (
    <div className={`relative border-b bg-yellow text-black group`}>
      {!isLastInRow && (
        <div className="absolute top-0 right-0 h-full border-r z-10" />
      )}
      <Link href={`/trabajos/${slug}`}>
        <div className="w-full aspect-w-1 aspect-h-1 border-b relative z-0">
          <Image
            src={`${process.env.STRAPI_API_URL}${cover.url}`}
            alt={cover.url}
            width={1920}
            height={1080}
            className="w-full h-full object-cover yellow-cursor"
          />
        </div>
        <div className="p-4">
          <h3 className="group-hover:underline">{title}</h3>
          <p>
            <span className="font-bold">{client}</span>
            <br />
            <span>{discipline}</span>
          </p>
        </div>
      </Link>
    </div>
  );
}

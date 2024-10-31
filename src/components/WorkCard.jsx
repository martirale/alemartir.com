import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function WorkCard({
  title,
  slug,
  client,
  disciplines,
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
        {disciplines && disciplines.length > 0 ? (
          <div className="absolute top-2 right-2 z-20 flex flex-wrap justify-end gap-1">
            <span className="bg-yellow border border-black py-1 px-3 text-xs rounded-full inline-block">
              {disciplines.map((discipline, index) => (
                <React.Fragment key={discipline.id}>
                  {discipline.title}
                  {index < disciplines.length - 1 && " • "}
                </React.Fragment>
              ))}
            </span>
          </div>
        ) : (
          <span>No especificado</span>
        )}
        <div className="p-4">
          <p className="mb-2">{client}</p>
          <h3 className="group-hover:underline">{title}</h3>
        </div>
      </Link>
    </div>
  );
}

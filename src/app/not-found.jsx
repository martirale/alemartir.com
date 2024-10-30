import React from "react";
import { getGlobal } from "@lib/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGhost } from "@fortawesome/free-solid-svg-icons";

export async function generateMetadata() {
  const globalData = await getGlobal();
  const { sitename, description } = globalData;

  return {
    title: `404 Not Found | ${sitename}`,
    description: `${description}`,
  };
}

export default function NotFound() {
  return (
    <>
      <h1>404 Not Found</h1>

      <div className="grid grid-cols-1 w-full md:min-h-[calc(100dvh-360px)]">
        <h2 className="text-9xl text-center px-4 mt-16 mb-8 2xl:mt-32">
          F
          <FontAwesomeIcon
            icon={faGhost}
            className="w-24 h-24 align-middle mb-5"
          />
        </h2>

        <p className="text-2xl text-center px-4 mb-16">
          La página no existe...
        </p>
      </div>
    </>
  );
}

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

      <div className="grid grid-cols-1 md:grid-cols-2 w-full md:min-h-[calc(100vh-50%)]">
        <div className="col-span-1 border-b md:border-r md:border-b-0">
          <h2 className="text-7xl text-center px-4 py-32">
            F... <FontAwesomeIcon icon={faGhost} className="w-16 h-16" />
          </h2>
        </div>

        <div className="col-span-1">
          <p className="text-2xl text-center px-4 py-16 md:py-32 md:mt-7">
            Lo siento, la página no existe...
          </p>
        </div>
      </div>
    </>
  );
}

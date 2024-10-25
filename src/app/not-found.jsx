import React from "react";
import { getGlobal } from "@lib/api";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSkull } from "@fortawesome/free-solid-svg-icons";

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

      <div className="flex flex-col md:flex-row w-full md:min-h-[calc(100vh-50%)]">
        <div className="flex-1 md:flex-[50%] border-b md:border-r md:border-b-0">
          <div className="flex items-center justify-center px-4">
            <h2 className="text-7xl text-center py-32">
              Ups, F... 404{" "}
              <FontAwesomeIcon icon={faSkull} className="w-16 h-16" />
            </h2>
          </div>
        </div>

        <div className="flex-1 md:flex-[50%]">
          <div className="flex items-center justify-center px-4">
            <p className="text-2xl text-center py-16 md:py-32 md:mt-4">
              Lo siento, pero parece que la página no existe...
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

import React from "react";
import { getGlobal } from "@lib/api";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

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
    </>
  );
}

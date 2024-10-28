import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faSpotify,
  faTwitch,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

export default function SocialLinks() {
  const links = [
    {
      index: 1,
      title: "Instagram",
      icon: faInstagram,
      url: "https://www.instagram.com/itsmrtr",
      border: "border-r",
    },
    {
      index: 2,
      title: "Facebook",
      icon: faFacebook,
      url: "https://www.facebook.com/itsmrtr/",
      border: "border-r",
    },
    {
      index: 3,
      title: "Spotify",
      icon: faSpotify,
      url: "https://open.spotify.com/artist/7sYIWPBUhdqqSMgCKCd8LU",
      border: "border-r",
    },
    {
      index: 4,
      title: "Twitch",
      icon: faTwitch,
      url: "https://twitch.tv/itsmrtr/",
      border: "border-r",
    },
    {
      index: 5,
      title: "LinkedIn",
      icon: faLinkedin,
      url: "https://www.linkedin.com/in/martirale",
      border: "border-0",
    },
  ];

  return (
    <div className="w-full bg-yellow text-black">
      <div className="flex flex-row p-2 border-b items-center justify-center">
        <h3 className="text-lg text-center">¡Sígueme!</h3>
      </div>

      <div className="flex flex-row w-full items-center justify-center">
        {links.map((link) => (
          <Link
            key={link.index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex-1 p-2 text-center ${link.border} hover:bg-black hover:text-yellow`}
            title={link.title}
          >
            <FontAwesomeIcon
              icon={link.icon}
              className="w-8 h-8 align-middle"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

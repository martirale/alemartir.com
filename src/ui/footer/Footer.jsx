import React from "react";
import FooterBrand from "./FooterBrand";
import FooterSections from "./FooterSections";
import FooterMisc from "./FooterMisc";
import FooterCopyright from "./FooterCopyright";

export default function Footer() {
  return (
    <footer className="w-full bg-yellow text-black border-t">
      <div className="flex flex-col md:flex-row w-full">
        <FooterBrand />
        <FooterSections />
        <FooterMisc />
        <FooterCopyright />
      </div>
    </footer>
  );
}

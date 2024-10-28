import React from "react";
import FooterBrand from "./FooterBrand";
import FooterSections from "./FooterSections";
import FooterMisc from "./FooterMisc";
import FooterCopyright from "./FooterCopyright";

export default function Footer() {
  return (
    <footer className="grid grid-cols-1 md:grid-cols-4 w-full bg-yellow text-black border-t">
      <FooterBrand />
      <FooterSections />
      <FooterMisc />
      <FooterCopyright />
    </footer>
  );
}

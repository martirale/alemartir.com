import React from "react";

export default async function HomeHero() {
  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-4 w-full border-b">
        <div className="col-span-1 md:border-r md:-mt-[75px] md:pt-[75px] md:h-dvh order-2 md:order-1">
          <p>Lorem ipsum 1.</p>
        </div>

        <div className="col-span-1 md:col-span-3 order-1 md:order-2">
          <p>Lorem ipsum 2.</p>
        </div>
      </section>
    </>
  );
}

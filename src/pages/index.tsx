import Seo from "@/components/common/Seo";
import React from "react";
import Image from "next/image";

import Intro from "@/components/home/Intro";
import Flip from "@/components/home/Flip";

import logoOnHover from "@/assets/svg/LOGO-ON-HOVER.svg";
import Brands from "./Brands";
import Contact from "@/components/home/Contact";

function Home() {
  return (
    <>
      <Seo
        title="Demo"
        opengraphImage={{ sourceUrl: "/thumbnail.png", altText: "Demo" }}
      />
      <h1 className="h-0 opacity-0">The Locavore</h1>
      <main className="relative">
        <section className="ios-height flex items-center justify-center">
          <div className="container flex h-full w-full flex-col items-center justify-between py-18 md:max-h-none xl:flex-row xl:py-19">
            <div className="text-center font-arial-rounded text-xl uppercase">
              434 6th ST
              <br />
              reenwicH
              <br />
              VILLAGE
            </div>
            <Image
              src={logoOnHover}
              alt="The Locavore"
              className="mx-auto w-full xl:w-6/12"
            />
            <div className="text-center font-arial-rounded uppercase">
              OPEN DAILY
              <br />
              10am-7pm
            </div>
          </div>
        </section>
        <section className="border-b border-dashed border-black pb-[100px] pt-[105px]">
          <Intro />
        </section>
        <section className="border-b border-dashed border-black pb-19 pt-10 lg:pt-13">
          <Flip />
        </section>
        <section className="border-dashed border-black py-[60px] lg:border-b">
          <Brands />
        </section>
        <section className="pb-[89px] pt-8 lg:pb-[93px] xl:pt-[130px]">
          <Contact />
        </section>
      </main>
    </>
  );
}

export default Home;

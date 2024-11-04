import React from "react";
import { Button } from "@/components/common/Button";
import Image from "next/image";

import flip from "@/assets/img/flip.png";

type Props = {};

function Flip({}: Props) {
  return (
    <div className="container mx-auto flex flex-col-reverse items-center justify-center gap-10 lg:flex-row lg:justify-center lg:gap-[126px]">
      <div className="flex flex-col items-center gap-10 lg:items-start">
        <h2 className="text-center font-arial-rounded text-[45px] leading-[1.1] tracking-[-1.35px] lg:text-start xl:text-[75px]">
          This Month: Local
          <br />
          Grill Gear, Our
          <br />
          Favorite
          <br className="md:hidden" />
          Sunscreen
        </h2>
        <Button>Download the Circular</Button>
      </div>
      <div className="relative w-[82%] md:w-[33%]">
        <Image src={flip} alt="" className="w-full" />
      </div>
    </div>
  );
}

export default Flip;

import React, { useState, useCallback } from "react";
import { Button } from "@/components/common/Button";
import Image from "next/image";
import { motion } from "framer-motion";
import Bird from "@/components/SVGs/Bird";
import flip from "@/assets/img/flip.png";
import useIsTouchDevice from "@/hooks/useIsTouchDevice";
import { cn } from "@/utils/cn";

function Flip() {
  const [isFlipped, setIsFlipped] = useState(false);

  const isTouchDevice = useIsTouchDevice();

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

      <button
        className="relative block h-full w-[82%] md:w-[33%]"
        onMouseEnter={() => {
          if (isTouchDevice) return;
          setIsFlipped(true);
        }}
        onMouseLeave={() => {
          if (isTouchDevice) return;
          setIsFlipped(false);
        }}
        onClick={() => setIsFlipped(!isFlipped)}
        style={{ perspective: 800 }}
      >
        {/* placeholder */}
        <Image src={flip} alt="" className="invisible w-full" />

        {/* flip card */}
        <motion.div
          className="absolute right-0 top-0 w-full"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{
            duration: 1,
            type: "spring",
          }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.div
            className="backface-hidden absolute left-0 top-0 w-full "
            style={{ backfaceVisibility: "hidden" }}
          >
            <Image src={flip} alt="" className="w-full" />
          </motion.div>

          <motion.div
            className="backface-hidden absolute left-0 top-0 w-full"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              background: "white",
              height: "100%",
            }}
          >
            <Image src={flip} alt="" className="w-full" />
          </motion.div>
        </motion.div>

        {/* bird */}
        <Bird
          isFlipped={isFlipped}
          className="absolute -left-1 top-1/2 origin-bottom -translate-y-1/2 lg:left-0 xl:left-1 2xl:left-3"
        />
      </button>
    </div>
  );
}

export default Flip;

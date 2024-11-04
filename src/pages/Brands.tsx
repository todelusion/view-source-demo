import useClient from "@/hooks/useClient";
import useScreen from "@/hooks/useScreen";
import React from "react";

const BrandItem = ({ letter }: { letter: string }) => {
  const client = useClient();

  if (!client) return null;

  const brands = Array.from(
    { length: Math.floor(Math.random() * 5) + 2 },
    (_, i) => `Brand ${i + 1}`
  );

  return (
    <div className="w-full">
      <div className="flex w-full flex-col gap-6 border-b border-dashed border-black py-5 pb-10 lg:max-w-[292px]">
        <div className="font-pp-neue text-xl font-medium">{letter}</div>
        <div className="flex flex-wrap gap-x-[82px] gap-y-2 lg:flex-col">
          {brands.map((_, index) => (
            <div
              key={index}
              className="w-1/3 font-pp-neue text-[17px] font-medium md:w-1/4 lg:w-auto"
            >
              Lorem Ipsum
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

function Brands() {
  const isOver1024 = useScreen({ width: 1024, type: "OVER" });

  const LETTERS = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  );
  const LETTER_GROUPS = [
    LETTERS.slice(0, 8), // A-H
    LETTERS.slice(8, 17), // I-Q
    LETTERS.slice(17, 26), // R-Z
  ];

  return (
    <div className="mx-auto max-w-screen-3xl px-4 xl:flex xl:justify-between xl:gap-x-[198px] xl:px-8">
      <h2 className="font-arial-rounded text-[55px] leading-[1.1]">
        Our <br className="hidden xl:block" />
        Brands
      </h2>
      {/* 電腦版不要使用 flex-wrap 自動排版否則高度會被一致 */}
      {!isOver1024 && (
        <div className="flex flex-wrap items-start">
          {LETTERS.map((letter) => (
            <BrandItem key={letter} letter={letter} />
          ))}
        </div>
      )}
      {isOver1024 && (
        <div className="flex w-full items-start gap-x-[69px]">
          {LETTER_GROUPS.map((group, index) => (
            <div key={index} className="w-full">
              {group.map((letter) => (
                <BrandItem key={letter} letter={letter} />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Brands;

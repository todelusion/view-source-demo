import React from "react";

type Props = {};

function Intro({}: Props) {
  return (
    <p className="container mx-auto px-4 text-center font-arial-rounded text-[30px] tracking-[-0.9px] md:text-[75px] md:tracking-[-3px] xl:whitespace-pre-line">
      {
        "An emporium of local goods, all\ngrown / baked / fabricated / assembled  / crafted / concocted / sewn\n/ stuffed / pickled within 100 miles of NYC."
      }
    </p>
  );
}

export default Intro;

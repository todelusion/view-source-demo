import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
const useScrollToAnchor = (dataID: string) => {
  useEffect(() => {
    if (!dataID) return;
    gsap.registerPlugin(ScrollToPlugin);

    gsap.to(window, {
      scrollTo: { y: `[data-id='${dataID}']` },
    });
  }, [dataID]);
};

export default useScrollToAnchor;

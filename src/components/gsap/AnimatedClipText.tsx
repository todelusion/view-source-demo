import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useFallingBlocksStore } from "@/stores/fallingBlocksStore";
import { getScreenMatch } from "@/hooks/useScreen";

export const parentTextClipPath = "polygon(0 0, 100% 0, 100% 100%, 0% 100%)";

interface AnimatedClipTextOptions {
  textSelector: string;
  duration?: number;
  scrollTrigger?: ScrollTrigger.Vars;
  isUnser768ToYpercent?: string;
}

const useAnimatedClipText = ({
  textSelector,
  duration = 1,
  scrollTrigger = {},
  isUnser768ToYpercent = "12%",
}: AnimatedClipTextOptions) => {
  const isAnimating = useFallingBlocksStore((state) => state.isAnimating);

  useEffect(() => {
    if (isAnimating) return;
    gsap.registerPlugin(ScrollTrigger);
    const isUnder768 = getScreenMatch(768, "UNDER");

    // 選擇所有匹配的元素
    const elements = gsap.utils.toArray<HTMLElement>(textSelector);

    // 為每個元素創建一個單獨的動畫
    elements.forEach((element) => {
      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.out" },
        delay: isAnimating ? 0.5 : 0,
      });

      tl.fromTo(
        element,
        { y: "100%" },
        { y: isUnder768 ? isUnser768ToYpercent : "0%", duration }
      );

      ScrollTrigger.create({
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        onEnter: () => tl.play(),
        ...scrollTrigger,
      });
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [
    textSelector,
    duration,
    scrollTrigger,
    isAnimating,
    isUnser768ToYpercent,
  ]);
};

export default useAnimatedClipText;

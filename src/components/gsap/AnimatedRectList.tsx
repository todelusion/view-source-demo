import RectMotionPath from "@/components/gsap/RectMotionPath";
import { cn } from "@/utils/cn";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React from "react";
import { useCallback, useEffect, useRef } from "react";

function AnimatedRectList({
  className,
  classNames,
  duration = 2,
  count = 10,
  scrollTrigger = {},
  startProgressArray = [40, 70, 80],
  showLastLines = false,
}: {
  className?: string;
  classNames?: { container?: string; item?: string; itemContent?: string };
  count?: number;
  duration?: number;
  scrollTrigger?: ScrollTrigger.Vars;
  startProgressArray?: number[];
  showLastLines?: boolean;
}) {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!listRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (!listRef.current) return;
      const items = listRef.current.querySelectorAll(".overflow-hidden > div");
      const itemsArray = Array.from(items);

      gsap.fromTo(
        itemsArray,
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        },
        {
          clipPath: (index) => {
            let startProgress;
            if (index === itemsArray.length - 1)
              startProgress = startProgressArray[0];
            else if (index === itemsArray.length - 2)
              startProgress = startProgressArray[1];
            else if (index === itemsArray.length - 3)
              startProgress = startProgressArray[2];
            else startProgress = 100;
            return `polygon(${startProgress}% 0%, 100% 0%, 100% 100%, ${startProgress}% 100%)`;
          },
          duration: duration,
          ease: "power3.inOut",
          stagger: 0.1, // 添加 stagger 效果
          scrollTrigger: {
            trigger: listRef.current,
            start: "top center",
            end: "bottom center",
            scrub: 1,
            ...scrollTrigger,
          },
        }
      );
    }, listRef.current);

    return () => ctx.revert();
  }, [duration, scrollTrigger, startProgressArray]);

  const itemHeight = `${Math.ceil(105 / count)}%`;

  return (
    <div
      className={cn(
        "flex h-[101%] w-full flex-col justify-start -space-y-[1px]",
        className
      )}
      ref={listRef}
    >
      {[...Array(count)].map((_, index) => (
        <div
          key={index}
          style={{ height: itemHeight }}
          className={cn("relative", classNames?.item)}
        >
          {showLastLines && index >= count - 5 && (
            <div className="absolute inset-x-0 top-0 h-px bg-white/50" />
          )}
          <div className="h-full w-full overflow-hidden">
            <div
              className={cn(
                "h-full w-full bg-primary_2",
                classNames?.itemContent
              )}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default React.memo(AnimatedRectList);

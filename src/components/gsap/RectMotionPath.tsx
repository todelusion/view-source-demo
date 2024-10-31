import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/utils/cn";
import { init } from "next/dist/compiled/@vercel/og/satori";
import useScreen from "@/hooks/useScreen";

interface RectMotionPathProps {
  path?: string;
  className?: string;
  accelerationPoint?: number;
  accelerationRate?: number;
  vars?: ScrollTrigger.StaticVars;
  showStroke?: boolean;
  shouldRenderMotionPath?: boolean;
}

function RectMotionPath({
  className,
  shouldRenderMotionPath,
  path = "M537 0.5C331.833 146.5 -59.2001 477.7 17.9999 634.5C114.5 830.5 996 1646 1064 2237.5",
  accelerationPoint = 0.3,
  accelerationRate = 1.5,
  vars = {},
  showStroke = false,
}: RectMotionPathProps) {
  const initBg =
    "linear-gradient(0deg, rgba(0, 72, 216, 1) 0%, rgba(0, 72, 216, 1) 100%)";

  const animateBg =
    "linear-gradient(0deg, rgba(0, 72, 216, 0.15) 0%, rgba(0, 72, 216, 0.60) 100%)";

  const exitBg =
    "linear-gradient(0deg, rgba(0, 72, 216, 0) 0%, rgba(0, 72, 216, 0.15) 100%)";

  const ballRef = useRef(null);
  const pathRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);
    const initProgress = 0.01;

    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      if (!ballRef.current || !pathRef.current) return;
      const mainTl = gsap.timeline({ paused: true });
      const secondaryTl = gsap.timeline({ paused: true });

      mainTl.to(ballRef.current, {
        motionPath: {
          path: pathRef.current,
          align: pathRef.current,
          alignOrigin: [0.5, 0.5],
          autoRotate: false,
        },
        ease: "none",
      });

      secondaryTl
        .to(ballRef.current, {
          rotation: -25,
          duration: 0.3,
          background: animateBg,
          opacity: 1,
          ease: "none",
        })
        .to(ballRef.current, {
          rotation: 25,
          duration: 0.7,
          background: exitBg,
          opacity: 0,
          ease: "none",
        });

      mainTl.progress(initProgress);
      secondaryTl.progress(initProgress);

      // Store the ScrollTrigger instance
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top center",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const calculateAcceleratedProgress = (
            progress: number,
            accelerationPoint: number,
            accelerationRate: number
          ) => {
            if (progress <= accelerationPoint) {
              return progress;
            } else {
              const acceleratedProgress =
                accelerationPoint +
                (progress - accelerationPoint) * accelerationRate;
              return Math.min(acceleratedProgress, 1);
            }
          };

          const progress = gsap.utils.mapRange(
            0,
            1,
            initProgress,
            1,
            self.progress
          );
          const acceleratedProgress = calculateAcceleratedProgress(
            progress,
            accelerationPoint,
            accelerationRate
          );

          mainTl.progress(acceleratedProgress);
          secondaryTl.progress(acceleratedProgress);
        },
        ...vars,
      });
    }, containerRef.current);

    return () => {
      ctx.revert();
    };
  }, [accelerationPoint, accelerationRate, vars]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute left-0 top-0 h-full w-full overflow-visible",
        className
      )}
    >
      <div
        style={{
          background: initBg,
        }}
        ref={ballRef}
        className="absolute h-[345px] w-[94px] rotate-[25deg]"
      />
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1065 2238"
        fill="none"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          ref={pathRef}
          d={path}
          stroke={showStroke ? "black" : "transparent"}
        />
      </svg>
    </div>
  );
}

export default React.memo(RectMotionPath);

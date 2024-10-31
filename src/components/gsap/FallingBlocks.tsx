import { useEffect, useRef } from "react";
import gsap from "gsap";
import React from "react";
import { useRouter } from "next/router";
import { useFallingBlocksStore } from "@/stores/fallingBlocksStore";

const light = "#050e25";
const lighter = "#1a253b";
const dark = "#000011";
const notToShow = ["/", "/about"];

interface FallingBlocksProps {
  colors?: string[];
}

function FallingBlocks({
  colors = [light, lighter, dark],
}: FallingBlocksProps) {
  // state
  const router = useRouter();
  const updateIsAnimating = useFallingBlocksStore(
    (state) => state.updateIsAnimating
  );

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      if (!containerRef.current) return;
      const container = containerRef.current;
      const blocks = [
        container,
        container.children[0],
        container.children[0].children[0],
      ];

      // 修改：初始狀態設置為展開狀態
      gsap.set(blocks, {
        transformOrigin: "50% 100%",
        rotate: 0,
        scaleY: 1,
      });

      // 創建時間軸
      const tl = gsap.timeline();

      // 修改：動畫設置為收縮狀態
      tl.to(blocks, {
        rotate: -10, // 改為 -10
        scaleY: 0, // 改為 0
        duration: 1.5,
        ease: "power4.in",
        stagger: 0.1,
        onStart: () => {
          updateIsAnimating(true);
        },
      }).to(
        {},
        {
          onStart: () => {
            updateIsAnimating(false);
          },
        },
        ">-1"
      );

      // 播放時間軸
      tl.play();
    });

    return () => {
      ctx.revert();
    };
  }, [router.pathname, updateIsAnimating]);

  if (notToShow.includes(router.pathname)) return null;

  return (
    <div
      ref={containerRef}
      className="fixed left-0 top-0 z-[100] flex h-[150vh] w-[150%] items-center justify-center"
      style={{ backgroundColor: colors[0] }}
    >
      <div
        style={{ backgroundColor: colors[1] }}
        className="flex h-[95%] w-full items-center justify-center"
      >
        <div
          style={{ backgroundColor: colors[2] }}
          className="h-[95%] w-full"
        ></div>
      </div>
    </div>
  );
}

export default React.memo(FallingBlocks);

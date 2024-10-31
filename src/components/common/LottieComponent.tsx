import React, { useRef, useEffect, useState, useCallback } from "react";
import type { AnimationItem, LottiePlayer } from "lottie-web";
import { cn } from "@/utils/cn";

interface LottieComponentProps {
  animationData: any;
  speed?: number;
  className?: string;
  maxWidth?: number;
  fill?: boolean;
  loop?: boolean;
  onLottieFileLoaded?: () => void;
  progress?: number; // 新增 progress prop，範圍 0-1
  autoplay?: boolean; // 新增 autoplay prop
  initialProgress?: number; // 新增 initialProgress prop，範圍 0-1
  endProgress?: number; // 新增 endProgress prop，範圍 0-1
  initialPlayDuration?: number;
  loopStartTime?: number; // 改為秒數
  loopEndTime?: number; // 改為秒數
}

const LottieComponent = React.memo(function LottieComponent({
  animationData,
  speed = 1,
  className,
  maxWidth,
  fill,
  loop = true,
  // 重命名為更明確的名稱
  onLottieFileLoaded,
  progress,
  autoplay = true, // 設置默認值為 true
  initialProgress = 0, // 設置默認值為 0
  endProgress = 1, // 設置默認值為 1
  initialPlayDuration,
  loopStartTime,
  loopEndTime,
}: // ... 其他 props ...
LottieComponentProps) {
  const lottieContainerRef = useRef<HTMLDivElement>(null);
  const [lottie, setLottie] = useState<LottiePlayer | null>(null);
  const animationRef = useRef<AnimationItem | null>(null);
  const [containerStyle, setContainerStyle] = useState({});
  const initialProgressRef = useRef(initialProgress);
  const endProgressRef = useRef(endProgress);
  const initialPlayRef = useRef(false);

  useEffect(() => {
    import("lottie-web").then((Lottie) => setLottie(Lottie.default));
  }, []);

  const loadAnimation = useCallback(() => {
    if (lottie && lottieContainerRef.current && !animationRef.current) {
      animationRef.current = lottie.loadAnimation({
        container: lottieContainerRef.current,
        renderer: "svg",
        loop: loop,
        autoplay: false,
        animationData: animationData,
      });

      if (animationRef.current) {
        animationRef.current.setSpeed(speed);

        // 使用 data_ready 事件來表示 Lottie 檔案讀取完畢
        if (onLottieFileLoaded) {
          animationRef.current.addEventListener(
            "DOMLoaded",
            onLottieFileLoaded
          );
        }

        // 獲取動畫的原始尺寸
        const animationDOMElement =
          lottieContainerRef.current.querySelector("svg");
        if (animationDOMElement && maxWidth) {
          const viewBox = animationDOMElement.getAttribute("viewBox");
          if (viewBox) {
            const [, , width, height] = viewBox.split(" ").map(Number);
            const aspectRatio = width / height;

            // 設置容器樣式
            setContainerStyle({
              maxWidth: `${maxWidth}px`,
              width: "100%",
              aspectRatio: aspectRatio.toString(),
            });
          }
        }

        const totalFrames = animationRef.current.totalFrames;
        const fps = animationRef.current.frameRate;

        // 將秒數轉換為幀數
        const convertTimeToFrame = (time: number) => Math.round(time * fps);
        animationRef.current.addEventListener("loopComplete", () => {});

        animationRef.current.addEventListener("loopComplete", () => {
          if (initialPlayRef.current) {
            // 初始播放完成，開始循環
            if (loopStartTime !== undefined && loopEndTime !== undefined) {
              const startFrame = convertTimeToFrame(loopStartTime);
              const endFrame = convertTimeToFrame(loopEndTime);
              animationRef.current?.playSegments([startFrame, endFrame], true);
            } else {
              animationRef.current?.goToAndPlay(0, true);
            }
          } else {
            // 初始播放剛完成，設置標誌並開始循環
            initialPlayRef.current = true;
            if (loopStartTime !== undefined && loopEndTime !== undefined) {
              const startFrame = convertTimeToFrame(loopStartTime);
              const endFrame = convertTimeToFrame(loopEndTime);
              animationRef.current?.playSegments([startFrame, endFrame], true);
            } else {
              animationRef.current?.goToAndPlay(0, true);
            }
          }
        });

        // 根據 initialPlayDuration 決定初始播放行為
        if (initialPlayDuration !== undefined) {
          const initialEndFrame = Math.min(
            convertTimeToFrame(initialPlayDuration),
            totalFrames
          );
          animationRef.current.playSegments([0, initialEndFrame], true);
        } else {
          // 如果沒有指定 initialPlayDuration，直接開始循環或完整播放
          initialPlayRef.current = true;
          if (loopStartTime !== undefined && loopEndTime !== undefined) {
            const startFrame = convertTimeToFrame(loopStartTime);
            const endFrame = convertTimeToFrame(loopEndTime);
            animationRef.current.playSegments([startFrame, endFrame], true);
          } else {
            animationRef.current.play();
          }
        }
      }
    }
  }, [
    lottie,
    animationData,
    speed,
    maxWidth,
    loop,
    onLottieFileLoaded,
    initialPlayDuration,
    loopStartTime,
    loopEndTime,
  ]);

  useEffect(() => {
    initialProgressRef.current = initialProgress;
    endProgressRef.current = endProgress;

    if (animationRef.current && animationRef.current.isLoaded) {
      const totalFrames = animationRef.current.totalFrames;
      const startFrame = Math.floor(initialProgressRef.current * totalFrames);
      const endFrame = Math.floor(endProgressRef.current * totalFrames);

      animationRef.current.playSegments([startFrame, endFrame], true);
    }
  }, [initialProgress, endProgress]);

  useEffect(() => {
    loadAnimation();
    let resizeObserver: ResizeObserver | null = null;

    if (fill) {
      resizeObserver = new ResizeObserver(() => {
        if (animationRef.current) {
          // 檢查 animationRef.current 是否仍然有效
          if (animationRef.current.isLoaded) {
            animationRef.current.resize();
          }
        }
      });

      if (lottieContainerRef.current) {
        resizeObserver.observe(lottieContainerRef.current);
      }
    }

    return () => {
      if (animationRef.current) {
        // 移除事件監聽器
        if (onLottieFileLoaded) {
          animationRef.current.removeEventListener(
            "DOMLoaded",
            onLottieFileLoaded
          );
        }
        animationRef.current.destroy();
        animationRef.current = null; // 保在銷毀後 ref 設為 null
      }
      if (fill && resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [fill, loadAnimation, onLottieFileLoaded]);

  useEffect(() => {
    if (
      animationRef.current &&
      animationRef.current.isLoaded &&
      progress !== undefined
    ) {
      // 設置動畫進度
      animationRef.current.goToAndStop(
        progress * animationRef.current.totalFrames,
        true
      );
    }
  }, [progress]);

  return (
    <div
      ref={lottieContainerRef}
      className={cn("watermark lottie", className)}
      // style={{
      //   willChange: "transform",
      //   transform: "translateZ(0)",
      //   backfaceVisibility: "hidden",
      //   overflow: "hidden",
      // }}
    />
  );
});

export default LottieComponent;

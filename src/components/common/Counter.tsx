import { cn } from "@/utils/cn";
import { VariantProps, cva } from "class-variance-authority";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  Easing,
} from "framer-motion";
import { useEffect } from "react";
import { twMerge } from "tailwind-merge";

export interface CounterProps {
  from: number;
  to: number;
  duration: number;
  play?: boolean;
  color?: string;
  className?: string;
  ease?: Easing; // 修改為 Easing 類型
}

export const Counter = ({
  className,
  play,
  from,
  to,
  duration,
  color,
  ease = "easeInOut", // 保持默認值
  ...props
}: CounterProps) => {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (!play) return;
    const controls = animate(count, to, {
      duration: duration,
      ease: ease as Easing, // 使用類型斷言
    });
    return controls.stop;
  }, [count, duration, play, to, ease]);

  return (
    <motion.div className={cn(className)} {...props}>
      {rounded}
    </motion.div>
  );
};

import { useFallingBlocksStore } from "@/stores/fallingBlocksStore";
import { gsap } from "gsap";
import { useEffect, useRef, RefObject, useState } from "react";

interface UseAnimatedListFadeInProps {
  animatedSelector?: string;
  triggerSelector?: string;
}

const useAnimatedListFadeIn = ({
  triggerSelector = '[data-anim="fade-in-trigger"]',
  animatedSelector = '[data-anim="fade-in-animated"]',
}: UseAnimatedListFadeInProps = {}) => {
  const [play, setPlay] = useState(false);
  const [delay, setDelay] = useState(0);
  const [isInitiallyVisible, setIsInitiallyVisible] = useState<boolean | null>(
    null
  );

  const isAnimating = useFallingBlocksStore((state) => state.isAnimating);

  useEffect(() => {
    if (isAnimating) return;

    gsap.to(animatedSelector, {
      y: 100,
      opacity: 0,
    });

    const animation = gsap.to(animatedSelector, {
      y: 0,
      opacity: 1,
      stagger: 0.1,
      duration: 0.8,
      ease: "power3.out",
      paused: true,
      delay: delay,
      onStart: () => {
        setDelay(0);
      },
    });

    if (play) {
      animation.play();
    }

    return () => {
      gsap.to(animatedSelector, {
        y: 100,
        opacity: 0,
      });
    };
  }, [animatedSelector, delay, isAnimating, play]);

  useEffect(() => {
    if (isInitiallyVisible) {
      setDelay(0.5);
    }
    return () => {
      setDelay(0);
    };
  }, [isInitiallyVisible]);

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (isInitiallyVisible === null) {
          setIsInitiallyVisible(entry.isIntersecting);
        }
        if (entry.isIntersecting) {
          setPlay(true);
        } else {
          setPlay(false);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    });

    const currentRef = document.querySelector(triggerSelector);

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [triggerSelector, isInitiallyVisible]);

  return { isInitiallyVisible };
};

export default useAnimatedListFadeIn;

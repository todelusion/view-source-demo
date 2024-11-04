import { useEffect, useState } from "react";
/* 使用 matchMedia 的好處是，web api 不會在每次畫面改動而觸發 callback ，只會在符合 mediaQuery 時觸發 */
/* 使用 inner width 每次畫面寬度變動都會重複觸發 */

export interface UseScreenProps {
  width?: number;
  type?: "UNDER" | "OVER";
}

export const mediaQueryListener = (
  callback: (e?: MediaQueryListEvent, mediaQuery?: MediaQueryList) => void,
  width?: number
) => {
  // 對 window 新增 media query 監聽
  const mediaQuery = window.matchMedia(`(min-width: ${width ?? 768}px)`);

  // mediaQuery 每次改變就會觸發 callback
  const handleMediaQueryChange = (
    e: MediaQueryListEvent,
    mediaQuery?: MediaQueryList
  ) => {
    callback(e, mediaQuery);
  };

  // 監聽 mediaQuery 本身的改變
  mediaQuery.addEventListener("change", handleMediaQueryChange);

  const clearListener = () => {
    mediaQuery.removeEventListener("change", handleMediaQueryChange);
  };

  return { clearListener, mediaQuery };
};

const useScreen = (props: UseScreenProps): boolean | null => {
  const { width, type } = props || {};
  const [isScreen, setIsScreen] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleScreenState = (
      e?: MediaQueryListEvent,
      mediaQuery?: MediaQueryList
    ) => {
      if (e === undefined && mediaQuery === undefined) return;
      const matches = e ? e.matches : mediaQuery!.matches;
      if (type === "OVER") {
        setIsScreen(matches);
        return;
      }
      setIsScreen(!matches);
    };
    const { clearListener, mediaQuery } = mediaQueryListener(
      handleScreenState,
      width
    );
    handleScreenState(undefined, mediaQuery);

    // unMounted 時觸發 removeEventListener
    return () => {
      clearListener();
    };
  }, [type, width]);

  return isScreen;
};

export const getScreenMatch = (
  width?: number,
  type?: "UNDER" | "OVER"
): boolean => {
  if (typeof window === "undefined") return false;

  const mediaQuery = window.matchMedia(`(min-width: ${width ?? 768}px)`);
  const matches = mediaQuery.matches;

  return type === "UNDER" ? !matches : matches;
};

export const useScreenResize = () => {
  useEffect(() => {
    const handleResize = () => {
      window.location.reload();
    };
    const { clearListener: clearListener768 } = mediaQueryListener(
      handleResize,
      768
    );
    const { clearListener: clearListener1024 } = mediaQueryListener(
      handleResize,
      1024
    );
    const { clearListener: clearListener1280 } = mediaQueryListener(
      handleResize,
      1280
    );
    const { clearListener: clearListener1440 } = mediaQueryListener(
      handleResize,
      1440
    );
    const { clearListener: clearListener1920 } = mediaQueryListener(
      handleResize,
      1920
    );
    const { clearListener: clearListener2560 } = mediaQueryListener(
      handleResize,
      2560
    );

    return () => {
      clearListener768();
      clearListener1024();
      clearListener1280();
      clearListener1440();
      clearListener1920();
      clearListener2560();
    };
  }, []);
};

export default useScreen;

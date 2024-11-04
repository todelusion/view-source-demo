import { useEffect, useState } from "react";

const useIsTouchDevice = () => {
  const [isTouchDevice, setIsTouchDevice] = useState<boolean | null>(null);

  useEffect(() => {
    const hasTouchSupport = () => {
      return "ontouchstart" in window || navigator.maxTouchPoints > 0;
    };

    setIsTouchDevice(hasTouchSupport());
  }, []);

  return isTouchDevice;
};

export default useIsTouchDevice;

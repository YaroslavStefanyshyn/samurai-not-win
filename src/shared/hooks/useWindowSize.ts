import { useCallback, useLayoutEffect, useState } from "react";

interface Size {
  width: number;
  height: number;
}

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<Size>({
    width: 0,
    height: 0,
  });

  const handleResize = useCallback(() => {
    // Use debounce function here if needed
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  useLayoutEffect(() => {
    // Use ResizeObserver API here if supported, else use window event
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  return windowSize;
};

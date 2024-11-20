import React from "react";

export function useIsOnline(onOnline, onOffline, skipFirstRender = false) {
  const [isOnline, setIsOnline] = React.useState(navigator.onLine);
  const isFirstRender = React.useRef(true);

  const handleOnline = React.useCallback(() => {
    setIsOnline(true);
  }, []);

  const handleOffline = React.useCallback(() => {
    setIsOnline(false);
  }, []);

  React.useEffect(() => {
    if (skipFirstRender && isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const callback = isOnline ? onOnline : onOffline;
    if (typeof callback === "function") {
      try {
        callback();
      } catch (error) {
        console.error(
          `useIsOnline: ${isOnline ? "onOnline" : "onOffline"} callback error:`,
          error
        );
      }
    }

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [isOnline, onOnline, onOffline, skipFirstRender]);

  return isOnline;
}

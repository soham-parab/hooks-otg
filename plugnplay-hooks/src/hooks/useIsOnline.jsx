import React from "react";

export function useIsOnline({ onOnline, onOffline, skipFirstRender = false }) {
  const [isOnline, setIsOnline] = React.useState(navigator.onLine);

  const handleOnline = () => setIsOnline(true);
  const handleOffline = () => setIsOnline(false);

  const skipRef = React.useRef(!skipFirstRender);

  React.useEffect(() => {
    if (skipFirstRender) {
      skipRef.current = true;
      return;
    }
    if (skipRef.current)
      if (isOnline) {
        try {
          if (typeof onOnline === "function") onOnline();
        } catch (error) {
          console.error(
            "useIsOnline: onOnline callback is not a function",
            error
          );
        }
      } else {
        try {
          if (typeof onOffline === "function") onOffline();
        } catch (error) {
          console.error(
            "useIsOnline: onOffline callback is not a function",
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
  }, [isOnline, onOnline, onOffline, skipRef.current]);

  return isOnline;
}

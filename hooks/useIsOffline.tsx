import { useEffect, useState } from "react";

export default function useIsOffline() {
  const [isOffline, setIsOffline] = useState(false);

  const handleOffline = () => {
    setIsOffline(true);
  };
  const handleOnline = () => {
    setIsOffline(false);
  };

  useEffect(() => {
    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);
  return isOffline;
}

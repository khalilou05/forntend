import { useEffect, useRef, useState } from "react";

export default function useIsDirty(data: Record<string, any>) {
  const [isDirty, setisDirty] = useState(false);
  const prevData = useRef<Record<string, any> | null>(null);

  useEffect(() => {
    if (data) {
      prevData.current = data;
    }
  }, []);
  useEffect(() => {
    if (typeof data === "object" && data && prevData.current) {
      for (const x of Object.keys(data)) {
        if (data[x] !== prevData.current[x]) {
          setisDirty(true);
          return;
        }
        setisDirty(false);
      }
    }
  }, [data]);
  return isDirty;
}

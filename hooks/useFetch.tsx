import { DOMAIN_NAME } from "@/settings";
import { useEffect, useState } from "react";

export default function useFetch<T>(
  url: string,
  option: RequestInit = {},
  callBack?: (data: T) => void,
  deps: any[] = []
): {
  data: T | null;
  setData: React.Dispatch<React.SetStateAction<T | null>>;
  loading: boolean;
  error: string;
  statusCode: number;
} {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<T | null>(null);
  const [statusCode, setStatusCode] = useState(0);

  useEffect(() => {
    const abortctrl = new AbortController();
    setData(null);
    setLoading(true);
    setError("");
    (async () => {
      try {
        const resp = await fetch(`${DOMAIN_NAME}${url}`, {
          signal: abortctrl.signal,
          ...option,
        });
        const jsonData = await resp.json().catch(() => null);
        if (resp.ok) {
          setData(jsonData);
          callBack && callBack(jsonData);
          setStatusCode(resp.status);
        } else {
          throw Error(jsonData["msg"]);
        }
      } catch (err) {
        setError(err as string);
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      abortctrl.abort();
    };
  }, [url, ...deps]);

  return {
    data: data,
    setData,
    statusCode: statusCode,
    loading: loading,
    error: error,
  };
}

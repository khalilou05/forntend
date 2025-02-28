import fetchApi from "@/lib/fetch";

import { useEffect, useState } from "react";

export default function useFetch<T>(
  endpoint: string,
  startFetching: boolean = true,
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
    if (!startFetching) return;
    const abortctrl = new AbortController();
    setData(null);
    setLoading(true);
    setError("");
    (async () => {
      const { data, error, status } = await fetchApi<T>(endpoint, {
        method: "GET",
        signal: abortctrl.signal,
      });
      setStatusCode(status || 0);
      if (error) {
        setError(error);
      }
      if (data) {
        setData(data);
        callBack && callBack(data);
      }
      setLoading(false);
    })();

    return () => {
      abortctrl.abort();
    };
  }, [endpoint, startFetching, ...deps]);

  return {
    data,
    setData,
    statusCode,
    loading,
    error,
  };
}

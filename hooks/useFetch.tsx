import { SERVER_IP } from "@/settings";
import { useEffect, useState } from "react";

export default function useFetch<T>(
  url: string,
  option: RequestInit = {}
): {
  data: T | null;
  loading: boolean;
  error: string;
} {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    const abortctrl = new AbortController();
    setLoading(true);
    setError("");
    (async () => {
      try {
        const resp = await fetch(`${SERVER_IP}${url}`, {
          signal: abortctrl.signal,
          ...option,
        });
        const jsonData = await resp.json().catch(() => null);
        if (resp.ok) {
          setData(jsonData);
        } else {
          throw Error(jsonData["msg"]);
        }
      } catch (err) {
        setError(err as string);
      } finally {
        setLoading(false);
      }
    })();

    return () => abortctrl.abort();
  }, [url]);

  return { data: data, loading: loading, error: error };
}

import { DOMAIN_NAME } from "@/settings";

const fetchApi = async <T>(
  url: string,
  init: RequestInit = {}
): Promise<{ data?: T; status?: number; error?: string }> => {
  try {
    const resp = await fetch(`${DOMAIN_NAME}${url}`, { ...init });
    if (!resp.ok) return { error: "failed to fetch" };
    const jsonData = await resp.json();
    return { data: jsonData, status: resp.status };
  } catch (error) {
    if (error instanceof SyntaxError) return { error: "Failed to parse json" };
    return { error: "Failed to fetch" };
  }
};

export default fetchApi;

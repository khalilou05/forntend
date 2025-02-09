import { DOMAIN_NAME } from "@/settings";

const fetchApi = async <T>(
  url: string,
  init: RequestInit = {}
): Promise<{ data?: T; status?: number; error?: boolean }> => {
  try {
    const resp = await fetch(`${DOMAIN_NAME}${url}`, { ...init });
    const jsonData = await resp.json().catch(() => null);
    if (resp.ok) return { data: jsonData, status: resp.status };
    else throw new Error("failed to fetch");
  } catch (error) {
    return { error: true };
  }
};

export default fetchApi;

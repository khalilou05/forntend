import { API_URL } from "@/settings";

const fetchApi = async <T>(
  endpoint: string,
  init: RequestInit = {}
): Promise<{ data?: T; status?: number; error?: string }> => {
  try {
    const resp = await fetch(`${API_URL}${endpoint}`, init);
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    const jsonData = await resp.json().catch(() => {
      throw new Error("failed to parse json");
    });
    return { data: jsonData, status: resp.status };
  } catch (error) {
    if (error instanceof Error) return { error: error.message };
    return { error: "undefiend error" };
  }
};

export default fetchApi;

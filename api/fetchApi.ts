import { SERVER_IP } from "@/settings";

export async function fetchApi<T>(
  endpoint: string,
  option?: RequestInit,
): Promise<{ error: boolean; status: number | null; data: T | null }> {
  try {
    const response = await fetch(`${SERVER_IP}${endpoint}`, { ...option });
    return {
      error: false,
      status: response.status,
      data: await response.json().catch(() => {
        console.error("fail to parse json data");
        return null;
      }),
    };
  } catch (error) {
    return { error: true, status: null, data: null };
  }
}

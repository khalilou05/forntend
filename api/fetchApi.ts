import { SERVER_IP } from "@/settings";

export async function fetchApi<T>(
  endpoint: string,
  option: RequestInit = {}
): Promise<{ error?: boolean; status?: number; data?: T; msg?: string }> {
  try {
    const response = await fetch(`${SERVER_IP}${endpoint}`, { ...option });
    return {
      status: response.status,
      data: await response.json().catch(() => {
        return null;
      }),
    };
  } catch (error) {
    return { error: true };
  }
}

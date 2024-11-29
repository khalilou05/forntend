import { SERVER_IP } from "@/settings";

export async function fetchApi<T>(
  endpoint: string,
  option?: RequestInit,
): Promise<{ status: number; data: T | null } | undefined> {
  try {
    const response = await fetch(`${SERVER_IP}${endpoint}`, { ...option });

    return {
      status: response.status,
      data: await response.json().catch(() => null),
    };
  } catch (error) {
    console.error(error);
  }
}

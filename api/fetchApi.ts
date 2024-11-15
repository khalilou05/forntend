import { SERVER_IP } from "@/settings";

export async function fetchApi<T>(
  endpoint: string,
  option: RequestInit = {}
): Promise<{ status: number; data: T } | undefined> {
  try {
    const response = await fetch(`${SERVER_IP}${endpoint}`, {
      credentials: "include",
      ...option,
    });
    const data = await response.json();
    return { status: response.status, data: data };
  } catch (error) {
    return undefined;
  }
}

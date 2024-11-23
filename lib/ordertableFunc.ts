import type { OrderIn } from "@/types/types";
import { MutableRefObject } from "react";

export function inSelectedOrder(orderId: number, selectedOrders: OrderIn[]) {
  for (let i of selectedOrders) {
    if (orderId == i.id) {
      return true;
    }
  }
  return false;
}

export function orderStatusFormat(status: string) {
  if (status == "pending") return "جديدة";
  if (status == "confirmed") return "مأكدة";
  if (status == "canceled") return "ملغاة";
  if (status == "shipped") return "تم الشحن";
  if (status == "returned") return "روتور";
}

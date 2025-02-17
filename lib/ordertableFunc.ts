export function orderStatusFormat(status: string) {
  if (status == "pending") return "جديدة";
  if (status == "confirmed") return "مأكدة";
  if (status == "canceled") return "ملغاة";
  if (status == "shipped") return "تم الشحن";
  if (status == "returned") return "روتور";
}

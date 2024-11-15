import { fetchApi } from "@/api/fetchApi";
import OrderTable from "@/components/ordertable";
import { Order } from "@/types/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "الطلبيات",
  description: "الطلبيات",
};

async function OrdersPage() {
  const ordersCount = await fetchApi<number>(`/order`);
  const orders = await fetchApi<Order[]>(`/order?status=all`);

  return (
    <OrderTable
      ordersCount={ordersCount?.data || 0}
      data={orders?.data || []}
    />
  );
}

export default OrdersPage;

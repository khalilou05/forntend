import { fetchApi } from "@/api/fetchApi";
import OrderTable from "@/components/ordertable";
import { OrderIn } from "@/types/types";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "الطلبيات",
  description: "الطلبيات",
};

async function OrdersPage() {
  const { data: orderCount } = await fetchApi<number>(
    `/order/count?status=all`
  );
  const { data: orders } = await fetchApi<OrderIn[]>(`/order?status=all`);

  return (
    <OrderTable
      ordersCount={orderCount || 0}
      ordersList={orders || []}
    />
  );
}

export default OrdersPage;

import OrderTable from "@/components/ordertable";
import fetchApi from "@/lib/fetch";
import { OrderIn } from "@/types/types";

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

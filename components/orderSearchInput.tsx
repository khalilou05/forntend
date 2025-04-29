import { ChangeEvent, useEffect, useState } from "react";

import { OrderIn } from "@/types/types";

import { Input } from "@/components/inputGroup";
import fetchApi from "@/lib/fetch";

type OrderFilterInput = {
  setOrders: (orders: OrderIn[]) => void;
  orderStatus: string;
};

function OrderSerchInput({ setOrders, orderStatus }: OrderFilterInput) {
  const [query, setquery] = useState("");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setquery(e.target.value);
  };
  useEffect(() => {
    if (query == "") {
      (async () => {
        try {
          const response = await fetchApi<OrderIn[]>(
            `/order?status=${orderStatus}`
          );
          if (response?.status == 200 && response.data)
            setOrders(response.data);
          else setOrders([]);
        } catch (error) {
          console.log(error);
        }
      })();
      return;
    }
    const timeoutId = setTimeout(async () => {
      try {
        const response = await fetchApi<OrderIn[]>(`/order/search?q=${query}`);
        if (response?.status == 200 && response.data) setOrders(response.data);
        else setOrders([]);
      } catch (error) {
        console.log(error);
      }
    }, 200);

    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <Input
      placeholder="إبحث برقم الهاتف أو الإسم"
      onChange={handleSearch}
    />
  );
}

export default OrderSerchInput;

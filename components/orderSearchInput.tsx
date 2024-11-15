import React, { ChangeEvent, useEffect, useState } from "react";
import SearchIcon from "@/assets/icons/search";

import { fetchApi } from "@/api/fetchApi";
import { Order, OrderFilterInput } from "@/types/types";

function OrderSerchInput({
  setOrders,
  orderStatus,
  orderLength,
}: OrderFilterInput) {
  const [query, setquery] = useState("");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setquery(e.target.value);
  };
  useEffect(() => {
    if (query == "") {
      (async () => {
        try {
          const response = await fetchApi<Order[]>(
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
        const response = await fetchApi<Order[]>(`/order/search?q=${query}`);
        if (response?.status == 200 && response.data) setOrders(response.data);
        else setOrders([]);
      } catch (error) {
        console.log(error);
      }
    }, 200);

    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <>
      <SearchIcon size={20} />

      <input
        disabled={orderLength === 0 ? true : false}
        onChange={handleSearch}
        placeholder="بحث عن رقم هاتف أو الإسم"
        type="text"
      />
    </>
  );
}

export default OrderSerchInput;

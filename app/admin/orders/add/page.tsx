"use client";
import ArticleSearchBar from "@/components/add_order/ArticleSearchBar";
import CustomerInfo from "@/components/add_order/CustomerInfo";
import OrderSummary from "@/components/add_order/OrderSummary";
import HeaderNav from "@/components/HeaderNav";
import style from "@/css/route/add_order.module.css";
import { type OrderOut } from "@/types/types";
import { useEffect, useState } from "react";

export default function AddOrderPage() {
  const [order, setOrder] = useState<OrderOut>({
    full_name: "",
    phone_number: "",
    wilaya_id: 0,
    baladiya_id: 0,
    home_dilvery: false,
  });

  const handleOrderData = (
    prop: keyof OrderOut,
    value: string | number | boolean
  ) => {
    setOrder((prv) => ({ ...prv, [prop]: value }));
  };

  useEffect(() => {
    document.title = "إضافة طلبية";
  }, []);
  return (
    <div className={style.warper}>
      <HeaderNav title="إضافة طلبية" />

      <div className={style.column_Warper}>
        <div className={style.right_section}>
          <ArticleSearchBar />
          <OrderSummary />
        </div>
        <div className={style.left_section}>
          <CustomerInfo handleOrderData={handleOrderData} />
        </div>
      </div>
    </div>
  );
}

"use client";
import style from "@/css/route/add_order.module.css";
import RightArrowIcon from "@/assets/icons/rightArrow";
import ArticleSearch from "@/components/add_order/ArticleSearch";
import CustomerInfo from "@/components/add_order/CustomerInfo";
import OrderSummary from "@/components/add_order/OrderSummary";
import Link from "next/link";
import { useEffect, useState } from "react";
import { type OrderOut } from "@/types/types";

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
    setOrder({ ...order, [prop]: value });
  };

  useEffect(() => {
    document.title = "إضافة طلبية";
  }, []);
  return (
    <div className={style.warper}>
      <div className={style.navBar}>
        <Link href={"/admin/orders"}>
          <span>
            <RightArrowIcon size={20} />
          </span>
        </Link>
        إضافة طلبية
      </div>
      <div className={style.column_Warper}>
        <div className={style.right_section}>
          <ArticleSearch />
          <OrderSummary />
        </div>
        <div className={style.left_section}>
          <CustomerInfo handleOrderData={handleOrderData} />
        </div>
      </div>
    </div>
  );
}

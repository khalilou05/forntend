"use client";
import style from "@/css/route/add_order.module.css";
import RightArrowIcon from "@/assets/icons/rightArrow";
import ArticleSearch from "@/components/add_order/ArticleSearch";
import CustomerInfo from "@/components/add_order/CustomerInfo";
import OrderSummary from "@/components/add_order/OrderSummary";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AddOrderPage() {
  const [order, setorder] = useState({
    fullName: "",
    phoneNumber: 0,
    wilaya: 0,
    baladiya: 0,
    homeDelivery: false,
  });

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
          <CustomerInfo />
        </div>
      </div>
    </div>
  );
}

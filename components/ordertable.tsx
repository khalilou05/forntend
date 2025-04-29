"use client";
import style from "@/css/orderTable.module.css";
import { phoneFormat } from "@/lib/phoneNformat";
import { OrderStatus, type OrderIn, type OrderTableProps } from "@/types/types";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import OrderSerchInput from "@/components/orderSearchInput";
import useFetch from "@/hooks/useFetch";
import Badge from "./Badge";
import Button from "./Button";
import Card from "./Card";
import CheckBox from "./CheckBox";

function OrderTable({ ordersList, ordersCount }: OrderTableProps) {
  const [selectedOrders, setselectedOrders] = useState<OrderIn[]>([]);
  const [orderCount, setOrderCount] = useState(ordersCount);
  const [orderToViewId, setorderToViewId] = useState(0);
  const [orderStatus, setOrderStatus] = useState<OrderStatus>("all");

  const selectAllInput = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const { data: orders, setData } = useFetch<OrderIn[]>(
    `/order?status=${orderStatus}`,
    true,
    undefined,
    [orderStatus]
  );
  const handleSelectOrder = (order: OrderIn) => {
    const inSelectedOrder = selectedOrders.find((item) => item.id === order.id);
    if (inSelectedOrder)
      setselectedOrders((prv) => prv.filter((item) => item.id !== order.id));
    else setselectedOrders((prv) => [...prv, order]);
  };
  const handleOrderStatusChange = (status: OrderStatus) => {
    setOrderStatus(status);
    setselectedOrders([]);
  };

  const handleSelectAllOrder = () => {
    if (!orders?.length) return;
    if (orders.length === selectedOrders?.length) {
      setselectedOrders([]);
    } else {
      setselectedOrders(orders);
    }
  };

  const inSelectedOrder = (orderId: number) => {
    const inSelected = selectedOrders.find((item) => item.id === orderId);
    if (inSelected) return true;
    else return false;
  };

  useEffect(() => {
    if (!selectAllInput.current) return;
    switch (selectedOrders.length) {
      case 0:
        selectAllInput.current.checked = false;
        selectAllInput.current.indeterminate = false;
        break;
      case orders?.length:
        selectAllInput.current.checked = true;
        selectAllInput.current.indeterminate = false;
        break;
      default:
        selectAllInput.current.checked = false;
        selectAllInput.current.indeterminate = true;
    }
  }, [selectedOrders]);

  const btnStatusBadge: Array<{ name: string; status: OrderStatus }> = [
    { name: "الكل", status: "all" },
    { name: "جديدة", status: "pending" },
    { name: "مأكدة", status: "confirmed" },
    { name: "لايرد", status: "notresponding" },
    { name: "ملغاة", status: "canceled" },
    { name: "مرجعة", status: "returned" },
  ];

  return (
    <section className={style.warper}>
      <div className={style.top_bar}>
        <div className={style.search_inpt}>
          <OrderSerchInput
            orderStatus={orderStatus}
            setOrders={setData}
          />
        </div>
        <Button
          onClick={() => router.push("/admin/orders/add")}
          buttonType="primary"
        >
          إضافة طلبية
        </Button>
      </div>
      <Card style={{ padding: 0 }}>
        <div className={style.status_bar}>
          {btnStatusBadge.map((item, index) => (
            <button
              key={index}
              onClick={() => handleOrderStatusChange(item.status)}
              className={
                orderStatus === item.status
                  ? style.status_badge__active
                  : style.status_badge
              }
            >
              {item.name}
            </button>
          ))}
        </div>
        <div className={style.fixed_row}>
          <div className={style.fixed_row_item}>
            <CheckBox
              ref={selectAllInput}
              onChange={handleSelectAllOrder}
            />
          </div>
          <div className={style.fixed_row_item}>الهاتف</div>
          <div className={style.fixed_row_item}>الإسم الكامل</div>
          <div className={style.fixed_row_item}>الولاية</div>
          <div className={style.fixed_row_item}>البلدية</div>
          <div className={style.fixed_row_item}>التوصيل</div>
          <div className={style.fixed_row_item}>الحالة</div>
          <div className={style.fixed_row_item}>تاريخ الطلب</div>
          <div className={style.fixed_row_item}></div>
        </div>
        <div className={style.order_container}>
          {orders?.length ? (
            <div className={style.no_orders}>لا توجد طلبيات</div>
          ) : (
            orders?.map((order) => (
              <div
                key={order.id}
                className={style.order_row}
              >
                <div>
                  <CheckBox
                    checked={inSelectedOrder(order.id)}
                    onChange={() => {
                      handleSelectOrder(order);
                    }}
                  />
                </div>
                <div>{phoneFormat(order.phone_number)}</div>
                <div>{order.full_name}</div>
                <div>{order.wilaya}</div>
                <div>{order.baladiya}</div>
                <div>{order.home_dilvery ? "للمنول" : "للمكتب"}</div>
                <div>
                  <Badge status={order.status} />
                </div>
                <div>
                  {Intl.DateTimeFormat("ar-DZ", {
                    year: "2-digit",
                    month: "long",
                    day: "numeric",
                  }).format(Date.parse(order.date))}
                  <span className={style.time}>{order.time}</span>
                </div>
                <div>{/* todo three dot drop down */}</div>
              </div>
            ))
          )}
        </div>
      </Card>
    </section>
  );
}

export default OrderTable;

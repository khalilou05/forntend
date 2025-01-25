"use client";
import React, { useEffect, useRef, useState } from "react";
import style from "@/css/component/orderTable.module.css";
import { OrderStatus, type OrderIn, type OrderTableProps } from "@/types/types";
import { inSelectedOrder, orderStatusFormat } from "@/lib/ordertableFunc";
import { phoneFormat } from "@/lib/phoneNformat";
import { useRouter } from "next/navigation";
import DropDown from "./DropDown";

import { fetchApi } from "@/api/fetchApi";
import Card from "./Card";
import Button from "./Button";
import Badge from "./Badge";
import OrderSerchInput from "@/components/orderSearchInput";

function OrderTable({ ordersList, ordersCount }: OrderTableProps) {
  const [selectedOrders, setselectedOrders] = useState<OrderIn[]>([]);
  const [orders, setOrders] = useState<OrderIn[]>(ordersList);
  const [orderCount, setOrderCount] = useState(ordersCount);
  const [orderToViewId, setorderToViewId] = useState(0);
  const [orderStatus, setOrderStatus] = useState<OrderStatus>("all");

  const selectAllInput = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const handleSelectOrder = (order: OrderIn) => {
    const selectedOrdersId = selectedOrders.map((order) => order.id);
    if (selectedOrdersId.includes(order.id)) {
      const removedOrderList = selectedOrders.filter(
        (sorder) => sorder.id != order.id
      );
      setselectedOrders(removedOrderList);
    } else {
      setselectedOrders([...selectedOrders, order]);
    }
  };
  const handleOrderStatusChange = (status: OrderStatus) => {
    setOrderStatus(status);
    setselectedOrders([]);
  };
  const getOrders = async () => {
    const { data } = await fetchApi<OrderIn[]>(`/order?status=${orderStatus}`);
    const { data: ordNumber } = await fetchApi<number>(
      `/order/count?status=${orderStatus}`
    );
    setOrderCount(ordNumber || 0);
    if (data) setOrders(data);
    else setOrders([]);
  };
  useEffect(() => {
    if (selectedOrders.length) {
      selectAllInput.current!.indeterminate = true;
      selectAllInput.current!.checked = false;
    }
    if (selectedOrders.length === orders.length) {
      selectAllInput.current!.checked = true;
      selectAllInput.current!.indeterminate = false;
    }
    if (selectedOrders.length === 0) {
      selectAllInput.current!.indeterminate = false;
      selectAllInput.current!.checked = false;
    }
  }, [selectedOrders.length]);

  useEffect(() => {
    getOrders();
  }, [orderStatus]);

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
            setOrders={setOrders}
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
            <input
              ref={selectAllInput}
              onChange={() => {
                if (orders.length && selectedOrders.length == orders.length) {
                  setselectedOrders([]);
                } else {
                  setselectedOrders(orders);
                }
              }}
              type="checkbox"
              id="checkbox"
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
          {!orders.length ? (
            <div className={style.no_orders}>لا توجد طلبيات</div>
          ) : (
            orders?.map((order) => (
              <div
                key={order.id}
                className={style.order_row}
              >
                <div>
                  <input
                    checked={inSelectedOrder(order.id, selectedOrders)}
                    onChange={() => {
                      handleSelectOrder(order);
                    }}
                    type="checkbox"
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

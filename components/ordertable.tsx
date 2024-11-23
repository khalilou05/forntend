"use client";
import React, { useEffect, useRef, useState } from "react";
import style from "@/css/component/orderTable.module.css";
import { OrderStatus, type OrderIn, type OrderTableProps } from "@/types/types";
import { inSelectedOrder, orderStatusFormat } from "@/lib/ordertableFunc";
import { phoneFormat } from "@/lib/phoneNformat";
import { useRouter } from "next/navigation";
import DropDown from "./DropDown";
import SearchInput from "@/components/orderSearchInput";

import { fetchApi } from "@/api/fetchApi";
import Link from "next/link";
import Card from "./Card";

function OrderTable({ data, ordersCount }: OrderTableProps) {
  const [selectedOrders, setselectedOrders] = useState<OrderIn[]>([]);
  const [orders, setOrders] = useState<OrderIn[]>(data || []);
  const [orderToViewId, setorderToViewId] = useState(0);
  const [orderStatus, setOrderStatus] = useState<OrderStatus>("all");

  const selectAllInput = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const handleSelectOrder = (order: OrderIn) => {
    const selectedOrdersId = selectedOrders.map((order) => order.id);
    if (selectedOrdersId.includes(order.id)) {
      const removedOrderList = selectedOrders.filter(
        (sorder) => sorder.id != order.id,
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
    const getOrders = async () => {
      try {
        const response = await fetchApi<OrderIn[]>(
          `/order?status=${orderStatus}`,
        );
        if (response?.status == 200 && response.data) setOrders(response.data);
        else setOrders([]);
      } catch (error) {
        console.log(error);
      }
    };
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
    <>
      <section className={style.warper}>
        <div className={style.top_bar}>
          <div className={style.search_inpt}>
            <SearchInput
              orderLength={orders.length}
              orderStatus={orderStatus}
              setOrders={setOrders}
            />
          </div>

          <Link href={"/admin/orders/add"}>
            <span>إضافة طلبية</span>
          </Link>
        </div>
        <Card className={style.card}>
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
              orders?.map((order, index) => (
                <div key={order.id} className={style.order_row}>
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
                    <span className={style[order.status]}>
                      {orderStatusFormat(order.status)}
                    </span>
                  </div>
                  <div>
                    {Intl.DateTimeFormat("ar-DZ", {
                      year: "2-digit",
                      month: "long",
                      day: "numeric",
                    }).format(Date.parse(order.date))}
                    <span className={style.time}>{order.time}</span>
                  </div>
                  <div>
                    <DropDown orderID={order.id} />
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </section>
    </>
  );
}

export default OrderTable;

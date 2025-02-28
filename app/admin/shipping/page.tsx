"use client";
import React, { useMemo, useRef, useState } from "react";
import style from "@/css/route/shipping.module.css";
import Toast from "@/components/toast";
import fetchApi from "@/lib/fetch";
import type { ToastMsg, Wilaya } from "@/types/types";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Input from "@/components/Input";
import Switch from "@/components/Switch";
import LoadingSpiner from "@/components/LoadingSpiner";

import useFetch from "@/hooks/useFetch";

function ShippingPage() {
  const [toastData, setToastData] = useState<ToastMsg[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const cache = useRef<Wilaya[]>([]);

  const { data: wilaya, setData } = useFetch<Wilaya[]>(
    "/wilaya",
    false,
    (data) => {
      cache.current = data;
    }
  );

  const getModified = useMemo(() => {
    if (!wilaya) return;
    return wilaya.filter((item, i) => {
      const prevItem = cache.current[i] ?? {};
      return Object.keys(item).some((prop) => prevItem[prop] !== item[prop]);
    });
  }, [wilaya, cache.current]);

  async function updateShippingCost() {
    if (!getModified) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    const { status, error } = await fetchApi("/wilaya", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(getModified),
    });
    if (status == 200) {
      cache.current = wilaya || [];
    }
    if (error) {
      console.log(error);
    }
  }

  const handleOnChange = (
    wilayaID: number,
    prop: keyof Wilaya,
    value: number | boolean
  ) => {
    if (!wilaya) return;
    if (typeof value === "number" && Number.isNaN(value)) return;
    setData(
      wilaya.map((item) =>
        item.id === wilayaID ? { ...item, [prop]: value } : item
      )
    );
  };

  return (
    <>
      {showModal && (
        <Toast
          data={toastData}
          setToastData={setToastData}
        />
      )}

      <Card style={{ padding: 0, width: "fit-content" }}>
        <div className={style.fixed_row}>
          <div className={style.row_item}>#</div>
          <div className={style.row_item}>الولاية</div>
          <div className={style.row_item}>توصيل للمكتب</div>
          <div className={style.row_item}>توصيل للمنزل</div>
          <div className={style.row_item}>تفعيل</div>
        </div>
        <div className={style.main}>
          {wilaya?.map((item) => (
            <div
              key={item.id}
              className={style.wilaya_row}
            >
              <div>{item.wilaya_code}</div>
              <div>{item.name}</div>
              <div>
                <Input
                  disabled={!item.active}
                  onChange={(e) => {
                    handleOnChange(
                      item.id,
                      "desk_price",
                      Number(e.target.value)
                    );
                  }}
                  value={item.desk_price}
                />
              </div>
              <div>
                <Input
                  disabled={!item.active}
                  onChange={(e) => {
                    handleOnChange(
                      item.id,
                      "home_price",
                      Number(e.target.value)
                    );
                  }}
                  value={item.home_price}
                />
              </div>
              <div>
                <Switch
                  onChange={(e) => {
                    handleOnChange(item.id, "active", e.target.checked);
                  }}
                  checked={item.active}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
      <Button
        disabled={getModified?.length ? false : true}
        onClick={updateShippingCost}
        buttonType={getModified?.length ? "primary" : "disabled"}
      >
        {loading ? (
          <LoadingSpiner
            borderTopColor="white"
            size={20}
          />
        ) : (
          "حفض"
        )}
      </Button>
    </>
  );
}

export default ShippingPage;

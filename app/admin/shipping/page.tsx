"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import Loding from "@/components/Loding";
import style from "@/css/route/shipping.module.css";
import Toast from "@/components/toast";
import { fetchApi } from "@/api/fetchApi";
import type { ToastMsg, WilayaData } from "@/types/types";

function ShippingPage() {
  const [wilaya, setwilaya] = useState<WilayaData[]>([]);
  const [toastData, setToastData] = useState<ToastMsg[]>([]);
  const prevWilaya = useRef<WilayaData[] | null>(null);
  const [btnLoading, setBtnLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  async function updateShippingCost() {
    setBtnLoading(true);
    try {
      const response = await fetchApi("/wilaya/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(wilaya),
      });
      if (response?.status == 200) {
        showNotification("ok", "done");
        prevWilaya.current = wilaya;
        return;
      }
      throw new Error("failed to update");
    } catch (err) {
      setwilaya(prevWilaya.current || wilaya);
      showNotification("non", "error");
    } finally {
      setTimeout(() => {
        setBtnLoading(false);
      }, 500);
    }
  }
  const showNotification = (msg: string, type: "done" | "error") => {
    setToastData([...toastData, { msg: msg, type: type }]);
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
    }, 3000);
  };

  const handleOnChange = (
    wilayaIndex: number,
    field: keyof WilayaData,
    value: string | number | boolean
  ) => {
    const newArray = wilaya?.map((item, index) =>
      index === wilayaIndex ? { ...item, [field]: value } : item
    );
    setwilaya(newArray);
  };
  useEffect(() => {
    const abortcntl = new AbortController();
    (async () => {
      try {
        const resp = await fetchApi<WilayaData[]>("/wilaya", {
          signal: abortcntl.signal,
        });
        if (resp?.status == 200 && resp.data) {
          setwilaya(resp.data);
          if (!prevWilaya.current) {
            prevWilaya.current = resp.data;
          }
          return;
        }
        throw new Error("error from the server");
      } catch (error) {
        console.error(error);
      }
    })();
    return () => abortcntl.abort();
  }, []);
  return (
    <>
      {showModal && (
        <Toast
          data={toastData}
          setToastData={setToastData}
        />
      )}

      <section className={style.card}>
        <div className={style.fixed_row}>
          <div className={style.row_item}>#</div>
          <div className={style.row_item}>الولاية</div>
          <div className={style.row_item}>توصيل للمكتب</div>
          <div className={style.row_item}>توصيل للمنزل</div>
          <div className={style.row_item}>تفعيل</div>
        </div>
        <div className={style.item_box}>
          {wilaya?.map((item, index) => (
            <div
              key={item.id}
              className={style.wilaya_row}
            >
              <div>{item.wilaya_code}</div>
              <div>{item.name}</div>
              <div>
                <input
                  onChange={(e) => {
                    handleOnChange(index, "desk_price", e.target.value);
                  }}
                  type="text"
                  value={item.desk_price}
                />
              </div>
              <div>
                <input
                  onChange={(e) => {
                    handleOnChange(index, "home_price", e.target.value);
                  }}
                  type="text"
                  value={item.home_price}
                />
              </div>
              <div>
                <input
                  onChange={(e) => {
                    handleOnChange(index, "active", e.target.checked);
                  }}
                  type="checkbox"
                  checked={item.active}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <button
        onClick={() => {
          updateShippingCost();
        }}
        className={style.submit_btn}
      >
        {btnLoading ? (
          <Loding
            borderTopColor="whitesmoke"
            size="20px"
          />
        ) : (
          "حفض"
        )}
      </button>
    </>
  );
}

export default ShippingPage;

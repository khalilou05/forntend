"use client";
import React, { useEffect, useRef, useState } from "react";
import Loding from "@/components/Loading";
import style from "@/css/route/shipping.module.css";
import Toast from "@/components/toast";
import { fetchApi } from "@/api/fetchApi";
import type { ToastMsg, Wilaya } from "@/types/types";
import Button from "@/components/Button";

function ShippingPage() {
  const [wilaya, setwilaya] = useState<Wilaya[]>([]);

  const [toastData, setToastData] = useState<ToastMsg[]>([]);
  const prevWilaya = useRef<Wilaya[] | null>(null);
  const [btdDisabled, setBtdDisabled] = useState(true);
  const [btnStyle, setBtnStyle] = useState<"primary" | "disabled">("primary");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const cache = useRef<Wilaya[]>([]);

  const getModified = () => {
    const modified = [];
    for (let i = 0; i < wilaya.length; i++) {
      const secendList = cache.current[i];
      for (const prop in wilaya[i]) {
        if (secendList[prop] !== wilaya[i][prop]) {
          modified.push(wilaya[i]);
          continue;
        }
      }
    }
    return modified;
  };

  async function updateShippingCost() {
    if (btdDisabled) return;
    setLoading(true);
    try {
      const response = await fetchApi("/wilaya", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(getModified()),
      });
      if (response?.status == 200) {
        prevWilaya.current = wilaya;
        cache.current = wilaya;
        setBtdDisabled(true);
        setTimeout(() => {
          setBtnStyle("disabled");
        }, 500);
      } else throw new Error("failed to update");
    } catch (err) {
      setwilaya(cache.current);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }

  const handleOnChange = (
    wilayaID: number,
    prop: keyof Wilaya,
    value: string | number | boolean,
  ) => {
    setwilaya((prv) =>
      prv.map((item) =>
        item.id === wilayaID ? { ...item, [prop]: value } : item,
      ),
    );
  };
  useEffect(() => {
    document.title = "إدارة التوصيل";
    const abortcntl = new AbortController();
    (async () => {
      try {
        const resp = await fetchApi<Wilaya[]>("/wilaya", {
          signal: abortcntl.signal,
        });
        if (resp?.status == 200 && resp.data) {
          setwilaya(resp.data);
          cache.current = resp.data;
        } else throw new Error("error from the server");
      } catch (error) {
        console.error(error);
      }
    })();

    return () => abortcntl.abort();
  }, []);

  useEffect(() => {
    const modified = getModified();
    if (modified.length) {
      setBtdDisabled(false);
      setBtnStyle("primary");
    } else {
      setBtdDisabled(true);
      setBtnStyle("disabled");
    }
  }, [JSON.stringify(wilaya)]);

  return (
    <>
      {showModal && <Toast data={toastData} setToastData={setToastData} />}

      <section className={style.card}>
        <div className={style.fixed_row}>
          <div className={style.row_item}>#</div>
          <div className={style.row_item}>الولاية</div>
          <div className={style.row_item}>توصيل للمكتب</div>
          <div className={style.row_item}>توصيل للمنزل</div>
          <div className={style.row_item}>تفعيل</div>
        </div>
        <div className={style.item_box}>
          {wilaya?.map((item) => (
            <div key={item.id} className={style.wilaya_row}>
              <div>{item.wilaya_code}</div>
              <div>{item.name}</div>
              <div>
                <input
                  className={item.active ? style.input : style.input_disabled}
                  disabled={!item.active}
                  onChange={(e) => {
                    handleOnChange(item.id, "desk_price", e.target.value);
                  }}
                  type="text"
                  value={item.desk_price}
                />
              </div>
              <div>
                <input
                  className={item.active ? style.input : style.input_disabled}
                  disabled={!item.active}
                  onChange={(e) => {
                    handleOnChange(item.id, "home_price", e.target.value);
                  }}
                  type="text"
                  value={item.home_price}
                />
              </div>
              <div>
                <input
                  onChange={(e) => {
                    handleOnChange(item.id, "active", e.target.checked);
                  }}
                  type="checkbox"
                  checked={item.active}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
      <Button
        disabled={btdDisabled}
        onClick={updateShippingCost}
        type={btnStyle}
      >
        {loading ? <Loding borderTopColor="whitesmoke" size="20px" /> : "حفض"}
      </Button>
    </>
  );
}

export default ShippingPage;

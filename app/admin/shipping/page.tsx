"use client";
import React, { useEffect, useRef, useState } from "react";
import style from "@/css/route/shipping.module.css";
import Toast from "@/components/toast";
import fetchApi from "@/lib/fetch";
import type { ToastMsg, Wilaya } from "@/types/types";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Input from "@/components/Input";
import Switch from "@/components/Switch";
import LoadingSpiner from "@/components/LoadingSpiner";

function ShippingPage() {
  const [wilaya, setwilaya] = useState<Wilaya[]>([]);

  const [toastData, setToastData] = useState<ToastMsg[]>([]);
  const prevWilaya = useRef<Wilaya[] | null>(null);
  const [btdDisabled, setBtdDisabled] = useState(true);
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
      const { status } = await fetchApi("/wilaya", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(getModified()),
      });
      if (status == 200) {
        prevWilaya.current = wilaya;
        cache.current = wilaya;
        setBtdDisabled(true);
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
    value: string | number | boolean
  ) => {
    setwilaya((prv) =>
      prv.map((item) =>
        item.id === wilayaID ? { ...item, [prop]: value } : item
      )
    );
  };
  useEffect(() => {
    document.title = "إدارة التوصيل";
    const abortcntl = new AbortController();
    (async () => {
      try {
        const { data, status } = await fetchApi<Wilaya[]>("/wilaya", {
          signal: abortcntl.signal,
        });
        if (status == 200 && data) {
          setwilaya(data);
          cache.current = data;
        } else throw new Error("error from the server");
      } catch (error) {
        console.log(error);
      }
    })();

    return () => abortcntl.abort();
  }, []);

  useEffect(() => {
    const modified = getModified();
    if (modified.length) {
      setBtdDisabled(false);
    } else {
      setBtdDisabled(true);
    }
  }, [JSON.stringify(wilaya)]);

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
                    handleOnChange(item.id, "desk_price", e.target.value);
                  }}
                  value={item.desk_price}
                />
              </div>
              <div>
                <Input
                  disabled={!item.active}
                  onChange={(e) => {
                    handleOnChange(item.id, "home_price", e.target.value);
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
        disabled={btdDisabled}
        onClick={updateShippingCost}
        buttonType={btdDisabled ? "disabled" : "primary"}
      >
        {loading ? <LoadingSpiner size={20} /> : "حفض"}
      </Button>
    </>
  );
}

export default ShippingPage;

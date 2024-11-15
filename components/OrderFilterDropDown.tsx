import React, { useEffect, useRef, useState } from "react";
import type { OrderStatus } from "@/types/types";
import { createPortal } from "react-dom";
import style from "@/css/component/order_filter_btn.module.css";
import BadgeStyle from "@/css/component/orderTable.module.css";

import FilterIcon from "@/assets/icons/filter";
type DropDownProp = {
  handleOrderStatusChange: (status: OrderStatus) => void;
};

function DropDown({ handleOrderStatusChange }: DropDownProp) {
  const dropRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    const handleClose = (e: MouseEvent) => {
      if (
        dropRef.current &&
        e.target instanceof Node &&
        !dropRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClose);
    else {
      document.removeEventListener("mousedown", handleClose);
    }
    return () => document.removeEventListener("mousedown", handleClose);
  }, [isOpen]);
  return (
    <>
      <button
        data-open={isOpen}
        onClick={(e) => {
          setOpen(true);
          const btn = e.currentTarget.getClientRects()[0];

          if (window.innerHeight - btn.bottom <= btn.height) {
            setPosition({
              top: btn.top,
              left: btn.left,
              width: btn.width,
            });
          } else {
            setPosition({ top: btn.bottom, left: btn.left, width: btn.width });
          }
        }}
        className={style.btn}
      >
        <FilterIcon size={"15px"} />
        <span>فلترة الطلبيات</span>
      </button>
      {isOpen &&
        createPortal(
          <div
            onClick={() => setOpen(false)}
            ref={dropRef}
            style={{
              top: position.top,
              left: position.left,
              width: position.width,
            }}
            className={style.content}
          >
            <div
              className={BadgeStyle.all}
              onClick={() => handleOrderStatusChange("all")}
            >
              كل الطلبيات
            </div>
            <div
              style={{
                height: "1px",
                width: "100%",
                backgroundColor: "gray",
                opacity: 0.3,
              }}
            />
            <div
              className={BadgeStyle.pending}
              onClick={() => handleOrderStatusChange("pending")}
            >
              جديدة
            </div>
            <div
              className={BadgeStyle.confirmed}
              onClick={() => handleOrderStatusChange("confirmed")}
            >
              مأكدة
            </div>
            <div
              className={BadgeStyle.notresponding}
              onClick={() => handleOrderStatusChange("notresponding")}
            >
              لا يرد
            </div>
            <div
              className={BadgeStyle.canceled}
              onClick={() => handleOrderStatusChange("canceled")}
            >
              ملغاة
            </div>
            <div
              className={BadgeStyle.returned}
              onClick={() => handleOrderStatusChange("returned")}
            >
              روتور
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

export default DropDown;

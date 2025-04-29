"use client";

import { useAddPrdCtx } from "@/context/AddProductCtx";
import style from "@/css/route/addArticle.module.css";
import Card from "./Card";

import { CurrencyInput } from "./inputGroup";

export default function ProductPrice() {
  const { handleProductUpdate } = useAddPrdCtx();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    prop: "price" | "prev_price" | "buying_price"
  ) => {
    const num = Number(e.target.value);
    if (Number.isNaN(num)) return;
    handleProductUpdate(prop, num);
  };
  return (
    <Card
      style={{ gap: 10 }}
      className={style.pricing_card}
    >
      <div className={style.wraper}>
        <div className={style.row_item}>
          <label>السعر الحالي</label>

          <CurrencyInput />
        </div>
        <div className={style.row_item}>
          <label>سعر المقارنة</label>

          <CurrencyInput style={{ textDecoration: "line-through red 1.5px" }} />
        </div>

        <div className={style.row_item}>
          <label>سعر الشراء</label>

          <CurrencyInput hintMessage="سعر الشراء لن يظهر للمشتري" />
        </div>
      </div>
    </Card>
  );
}

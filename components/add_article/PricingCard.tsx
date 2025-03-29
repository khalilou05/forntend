"use client";

import { useAddPrdCtx } from "@/context/AddProductContext";
import style from "@/css/route/addArticle.module.css";
import Card from "../Card";
import InputNumber from "../InputNumber";
import ToolTip from "../ToolTip";

export default function PricingCard() {
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
      title="التسـعـيـر"
      style={{ gap: 10 }}
      className={style.pricing_card}
    >
      <div className={style.wraper}>
        <div className={style.row_item}>
          <label>السعر الحالي</label>

          <InputNumber
            onChange={(e) => {
              handleChange(e, "price");
            }}
            label={"دج"}
          />
        </div>
        <div className={style.row_item}>
          <label>سعر المقارنة</label>

          <InputNumber
            onChange={(e) => {
              handleChange(e, "prev_price");
            }}
            label={"دج"}
            style={{
              textDecorationLine: "line-through",
              textDecorationColor: "red",
            }}
          />
        </div>

        <div className={style.row_item}>
          <label>سعر الشراء</label>

          <ToolTip
            tooltipPosition="center"
            value="سعر الشراء لن يظهر للزبون"
          >
            <InputNumber
              onChange={(e) => {
                handleChange(e, "buying_price");
              }}
              label="دج"
            />
          </ToolTip>
        </div>
      </div>
    </Card>
  );
}

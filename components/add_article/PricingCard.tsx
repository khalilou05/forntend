import style from "@/css/route/addArticle.module.css";
import type { Product } from "@/types/types";
import ToolTip from "../ToolTip";
import Card from "../Card";
import InputNumber from "../InputNumber";
import type { ChangeEvent } from "react";
import Input from "../Input";

type Prop = {
  setProduct: React.Dispatch<React.SetStateAction<Product>>;
  product: Product;
};

export default function PricingCard({ setProduct, product }: Prop) {
  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    prop: keyof Product
  ) => {
    const value = Number(e.target.value);
    if (!Number.isInteger(value)) return;
    setProduct((prv) => ({ ...prv, [prop]: value }));
  };
  return (
    <Card
      title="التسـعـيـر"
      style={{ gap: 10 }}
      className={style.pricing_card}
    >
      <div className={style.top_row}>
        <div className={style.row_item}>
          <label>السعر الحالي</label>

          <InputNumber
            onChange={(e) => handleChange(e, "price")}
            value={product.price}
            label={"دج"}
          />
        </div>
        <div className={style.row_item}>
          <label>السعر السابق</label>

          <InputNumber
            label={"دج"}
            value={product.prev_price}
            style={{
              textDecorationLine: "line-through",
              textDecorationColor: "red",
            }}
            onChange={(e) => handleChange(e, "prev_price")}
          />
        </div>
        <div className={style.row_item}></div>
      </div>
      <div className={style.down_row}>
        <div className={style.row_item}>
          <label>سعر الشراء</label>

          <ToolTip
            tooltipPosition="left"
            value="سعر الشراء لن يظهر للزبون"
          >
            <InputNumber
              value={product.buying_price}
              onChange={(e) => handleChange(e, "buying_price")}
              label="دج"
            />
          </ToolTip>
        </div>
        <div className={style.row_item}>
          <label>هامش الربح</label>
          <InputNumber
            readOnly
            value={product.price - product.buying_price || "--"}
            label="دج"
          />
        </div>
        <div className={style.row_item}>
          <label>النسبة</label>

          <Input
            value={`${
              Math.round((product.price - product.buying_price) * 100) /
                product.price || ""
            }%`}
            readOnly
          />
        </div>
      </div>
    </Card>
  );
}

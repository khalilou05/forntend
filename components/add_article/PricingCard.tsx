import style from "@/css/route/addArticle.module.css";
import type { Product } from "@/types/types";

type Prop = {
  handleChange: (prop: keyof Product, value: string | number | boolean) => void;
  product: Product;
};

export default function PricingCard({ handleChange, product }: Prop) {
  return (
    <div className={style.pricing_card}>
      <div className={style.title}>التسـعـيـر</div>
      <div className={style.top_row}>
        <div className={style.row_item}>
          <label>السعر الحالي</label>
          <div>
            <input
              onChange={(e) => {
                handleChange("price", Number(e.target.value));
              }}
              type="text"
            />
            <span>دج</span>
          </div>
        </div>
        <div className={style.row_item}>
          <label>السعر السابق</label>
          <div>
            <input
              className={style.prev_price}
              onChange={(e) =>
                handleChange("prev_price", Number(e.target.value))
              }
              type="text"
            />
            <span>دج</span>
          </div>
        </div>
        <div className={style.row_item}></div>
      </div>
      <div className={style.down_row}>
        <div className={style.row_item}>
          <label>سعر الشراء</label>
          <div>
            <input
              onChange={(e) =>
                handleChange("buying_price", Number(e.target.value))
              }
              type="text"
            />
            <span>دج</span>
          </div>
        </div>
        <div className={style.row_item}>
          <label>هامش الربح</label>
          <div>
            <input
              readOnly
              value={product.price - product.buying_price || "--"}
              type="text"
            />
            <span>دج</span>
          </div>
        </div>
        <div className={style.row_item}>
          <label>النسبة</label>
          <div>
            <input
              value={`${
                ((product.price - product.buying_price) * 100) /
                  product.price || ""
              }%`}
              readOnly
              type="text"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { InputNumArrow } from "@/components/inputGroup";
import { useAddPrdCtx } from "@/context/AddProductCtx";
import Card from "./Card";
import CheckBox from "./CheckBox";

export default function ProductStock() {
  const { handleProductUpdate } = useAddPrdCtx();

  return (
    <Card style={{ gap: 10 }}>
      <label htmlFor="stock">المخزون</label>

      <InputNumArrow id="stock" />
      <div>
        <CheckBox
          onChange={(e) =>
            handleProductUpdate("out_stock_sell", e.target.checked)
          }
        />
        <span>إستقبال الطلبيات بعد نفاذ المخزون</span>
      </div>
    </Card>
  );
}

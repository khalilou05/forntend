"use client";

import { useAddPrdCtx } from "@/context/AddProductContext";
import Card from "./Card";
import CheckBox from "./CheckBox";
import InputNumberArrow from "./InputNumberArrow";

export default function ProductStock() {
  const { handleProductUpdate } = useAddPrdCtx();

  return (
    <Card style={{ gap: 10 }}>
      <div>المخزون</div>

      <InputNumberArrow
        handleInputChange={(value) =>
          handleProductUpdate("global_stock", value)
        }
      />
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

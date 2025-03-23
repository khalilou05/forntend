import { Context } from "@/context/AddProductContext";
import { useContext } from "react";
import Card from "./Card";
import CheckBox from "./CheckBox";
import InputNumberArrow from "./InputNumberArrow";

export default function ProductStock() {
  const { handleProductUpdate } = useContext(Context);

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

import { Context } from "@/context/AddProductContext";
import { useContext } from "react";
import Card from "./Card";
import SelectInput from "./SelectInput";

export default function ProductShipping() {
  const { handleProductUpdate } = useContext(Context);

  return (
    <Card
      title="التوصيل"
      style={{ gap: 10 }}
    >
      <SelectInput
        onChange={(e) =>
          handleProductUpdate("free_shipping", !!Number(e.target.value))
        }
      >
        <option value={0}>غير مجاني</option>
        <option value={1}>مجاني</option>
      </SelectInput>
    </Card>
  );
}

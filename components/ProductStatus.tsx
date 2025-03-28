import { Context } from "@/context/AddProductContext";
import { useContext } from "react";
import Card from "./Card";
import SelectInput from "./SelectInput";

export default function ProductStatus() {
  const { handleProductUpdate } = useContext(Context);
  return (
    <Card
      title="حالة المنتج"
      style={{ gap: 10 }}
    >
      <SelectInput
        onChange={(e) =>
          handleProductUpdate("active", !!Number(e.target.value))
        }
      >
        <option value={1}>ظاهر في الموقع</option>
        <option value={0}>مخفي</option>
      </SelectInput>
    </Card>
  );
}

"use client";

import { useAddPrdCtx } from "@/context/AddProductCtx";
import Card from "./Card";
import SelectInput from "./SelectInput";

export default function ProductShipping() {
  const { handleProductUpdate } = useAddPrdCtx();

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

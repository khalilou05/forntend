import PlusIcon from "@/assets/icons/plusCircle";
import type { OptionItem } from "@/types/types";

import useFetch from "@/hooks/useFetch";
import type React from "react";
import Card from "../Card";
import CheckBox from "../CheckBox";
import { LineSkeleteon } from "../Skeleteon";

interface Prop extends React.ComponentProps<"div"> {}

export default function OptionListDropDown({ ...rest }: Prop) {
  return (
    <Card
      type="dropDown"
      {...rest}
    >
      <PlusIcon size={20} />
      إضافة خيار آخر
    </Card>
  );
}

type OptionListProp = {
  option_id: string;
  togleAddOptionItem: (optionId: string, itm: OptionItem) => void;
};

export function OptionListItemDrp({
  option_id,
  togleAddOptionItem,
}: OptionListProp) {
  const { data: optionItems, loading } = useFetch<OptionItem[]>(
    `/option_item?option_id=${option_id}`
  );

  return (
    <>
      {loading && <LineSkeleteon lineNum={3} />}

      {optionItems?.map((item) => (
        <div
          onClick={() => togleAddOptionItem(option_id, item)}
          key={item.id}
        >
          <CheckBox />
          {item.key}
        </div>
      ))}
    </>
  );
}

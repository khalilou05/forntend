import type { OptionItem, ProductOption } from "@/types/types";
import PlusIcon from "@/assets/icons/plusCircle";
import { use } from "react";

import fetchApi from "@/lib/fetch";
import useFetch from "@/hooks/useFetch";
import LoadingSpiner from "../LoadingSpiner";
import { LineSkeleteon } from "../Skeleteon";

type Prop = {
  setProductOption: React.Dispatch<React.SetStateAction<ProductOption[]>>;
};

export default function OptionListDropDown({ setProductOption }: Prop) {
  const { data, loading } = useFetch<ProductOption[]>("/option", true);

  const addProductOption = (option: ProductOption) => {
    setProductOption((prv) => [...prv, option]);
  };

  return (
    <>
      {loading && <LineSkeleteon lineNum={3} />}
      {data?.map((option) => (
        <div
          onClick={() =>
            addProductOption({ ...option, is_custom: false, items: [] })
          }
          key={option.id}
        >
          {option.name}
        </div>
      ))}
      <div
        // className={style.footer}
        onClick={() =>
          addProductOption({
            id: crypto.randomUUID(),
            name: "",
            is_custom: true,
            items: [{ id: crypto.randomUUID(), key: "", value: "" }],
          })
        }
      >
        <PlusIcon size={20} />
        إضافة خيار آخر
      </div>
    </>
  );
}

type OptionListProp = {
  option_id: string;
};

export function OptionListItemDrp({ option_id }: OptionListProp) {
  const { data, loading } = useFetch<OptionItem[]>(
    `/option_item?option_id=${option_id}`,
    true
  );

  return (
    <>
      {loading && <LineSkeleteon lineNum={3} />}

      {data?.map((option) => (
        <div key={option.id}>{option.key}</div>
      ))}
    </>
  );
}

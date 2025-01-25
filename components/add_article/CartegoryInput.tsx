import ArrowIcon from "@/assets/icons/selectArrow";
import style from "@/css/component/categoryInput.module.css";
import type { Product, Category } from "@/types/types";
import React, { useEffect, useRef, useState, type ChangeEvent } from "react";

import Input from "../Input";
import useFetch from "@/hooks/useFetch";
import LoadingSpiner from "../LoadingSpiner";
import DropDown from "../DropDown";
export default function CartegoryInput({
  setProdct,
}: {
  setProdct: React.Dispatch<React.SetStateAction<Product>>;
}) {
  const [inputValue, setinputValue] = useState("");
  const { data, loading } = useFetch<Category[]>("/category");
  const filtredCategory = data?.filter((item) =>
    item.name.startsWith(inputValue)
  );
  const category = filtredCategory || data;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setinputValue(e.target.value);
  };

  return (
    <DropDown
      customHeith={100}
      padding="10px"
      sameWidth={true}
      component={(_, componentRef, openDropDown) => (
        <div className={style.select_warper}>
          <Input
            value={inputValue}
            ref={componentRef}
            onClick={openDropDown}
            onChange={handleInputChange}
          />
          <ArrowIcon size={20} />
        </div>
      )}
      renderChildren={(closeDropDown) =>
        category?.map((item) => (
          <div
            onClick={closeDropDown}
            key={item.id}
          >
            {item.name}
          </div>
        ))
      }
    />
  );
}

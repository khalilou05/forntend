import ArrowIcon from "@/assets/icons/selectArrow";
import style from "@/css/component/categoryInput.module.css";
import type { Product, Category } from "@/types/types";
import React, { useEffect, useRef, useState, type ChangeEvent } from "react";

import Input from "../Input";
import useFetch from "@/hooks/useFetch";
import LoadingSpiner from "../LoadingSpiner";
import DropDown from "../DropDown";
import { LineSkeleteon } from "../Skeleteon";
export default function CartegoryInput({
  setProdct,
}: {
  setProdct: React.Dispatch<React.SetStateAction<Product>>;
}) {
  const [inputValue, setinputValue] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setinputValue(e.target.value);
  };

  return (
    <DropDown
      style={{
        padding: "10px",
        height: "50px",
      }}
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
      renderChildren={(closeDropDown) => (
        <CartegoryList setinputValue={setinputValue} />
      )}
    />
  );
}

export function CartegoryList({
  setinputValue,
}: {
  setinputValue: (value: string) => void;
}) {
  const { data: category, loading } = useFetch<Category[]>("/category");

  return (
    <>
      {loading && (
        <LineSkeleteon
          style={{ width: "100%" }}
          lineNum={3}
        />
      )}
      {category?.map((item) => (
        <div
          onClick={() => {
            setinputValue(item.name);
          }}
          key={item.id}
        >
          {item.name}
        </div>
      ))}
    </>
  );
}

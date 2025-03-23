import ArrowIcon from "@/assets/icons/selectArrow";
import style from "@/css/component/categoryInput.module.css";
import useFetch from "@/hooks/useFetch";
import type { Category } from "@/types/types";
import { useState, type ChangeEvent } from "react";
import DropDown from "../DropDown";
import Input from "../Input";
import { LineSkeleteon } from "../Skeleteon";

export default function CartegoryInput() {
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
        <CartegoryList
          closeDropDown={closeDropDown}
          setinputValue={setinputValue}
        />
      )}
    />
  );
}

export function CartegoryList({
  setinputValue,
  closeDropDown,
}: {
  setinputValue: (value: string) => void;
  closeDropDown: () => void;
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
            closeDropDown();
          }}
          key={item.id}
        >
          {item.name}
        </div>
      ))}
    </>
  );
}

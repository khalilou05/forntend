import ArrowIcon from "@/assets/icons/selectArrow";
import { useWarperRef } from "@/context/WarperRefCtx";
import style from "@/css/categoryInput.module.css";
import useFetch from "@/hooks/useFetch";
import type { Category } from "@/types/types";
import { useState, type ChangeEvent } from "react";
import Card from "../Card";
import DropDown from "../DropDown";
import { Input } from "../inputGroup";
import { LineSkeleteon } from "../Skeleteon";

export default function CartegoryInput() {
  const [inputValue, setinputValue] = useState("");
  const { warper } = useWarperRef();
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setinputValue(e.target.value);
  };

  return (
    <DropDown<HTMLInputElement>
      sameWidth={true}
      component={(_, componentRef, openDropDown) => (
        <div className={style.select_warper}>
          <Input
            type="text"
            value={inputValue}
            ref={componentRef}
            onClick={openDropDown}
            onChange={handleInputChange}
          />
          <ArrowIcon size={20} />
        </div>
      )}
      dropDown={(ref, styles, closeDropDown) => (
        <Card
          ref={ref}
          style={styles}
          type="dropDown"
        >
          <p>khalil</p>
        </Card>
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

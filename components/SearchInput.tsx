import style from "@/css/component/searchInput.module.css";
import SearchIcon from "@/assets/icons/search";
import React, { useEffect, useRef, useState } from "react";
import Input from "./Input";
import CircleX from "@/assets/icons/CircleX";

type Prop = {
  showXicon?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;
export default function SearchInput({ showXicon = false, ...rest }: Prop) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (rest.autoFocus) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, []);

  return (
    <div className={style.input_search}>
      <SearchIcon
        className={style.loopIco}
        size={20}
      />

      <Input
        {...rest}
        ref={inputRef}
        style={{ padding: "0px 25px" }}
      />
    </div>
  );
}

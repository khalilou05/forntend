import style from "@/css/component/searchInput.module.css";
import SearchIcon from "@/assets/icons/search";
import React, { useEffect, useRef } from "react";
import Input from "./Input";

export default function SearchInput({
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement>) {
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
      <SearchIcon size={20} />

      <Input
        ref={inputRef}
        style={{ paddingRight: "25px" }}
        {...rest}
      />
    </div>
  );
}

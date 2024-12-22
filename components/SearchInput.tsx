import style from "@/css/component/searchInput.module.css";
import SearchIcon from "@/assets/icons/search";
import { useEffect, useRef } from "react";

type Prop = {
  value?: string;
  placeholder: string;
  onChange?: (...args: any) => void;
  autoFocus?: boolean;
};

export default function SearchInput({
  placeholder,

  value,
  autoFocus = false,
  onChange,
}: Prop) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (autoFocus) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, []);
  return (
    <div className={style.input_search}>
      <SearchIcon size={20} />
      <input
        ref={inputRef}
        value={value}
        placeholder={placeholder}
        type="text"
        onChange={onChange}
      />
      
    </div>
  );
}

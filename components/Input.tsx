import type React from "react";
import style from "@/css/component/input.module.css";

type Prop = {
  placeholder?: string;
  ref?: React.Ref<HTMLInputElement>;
} & React.InputHTMLAttributes<HTMLInputElement>;
export default function Input({ placeholder, ref, ...rest }: Prop) {
  return (
    <input
      className={style.input}
      ref={ref}
      placeholder={placeholder}
      {...rest}
    />
  );
}

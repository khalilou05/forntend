import type React from "react";
import style from "@/css/component/input.module.css";
import type { ComponentProps } from "react";

export default function Input({ ...rest }: ComponentProps<"input">) {
  return (
    <input
      {...rest}
      className={style.input}
    />
  );
}

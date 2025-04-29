import style from "@/css/checkbox.module.css";
import type { ComponentProps } from "react";
export default function CheckBox({ ...rest }: ComponentProps<"input">) {
  return (
    <input
      {...rest}
      className={style.checkBox + " " + rest.className}
      type="checkbox"
    />
  );
}

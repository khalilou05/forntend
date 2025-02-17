import type React from "react";
import style from "@/css/component/checkbox.module.css";
import type {
  ComponentProps,
  ComponentPropsWithRef,
  HTMLProps,
  InputHTMLAttributes,
} from "react";
export default function CheckBox({ ...rest }: ComponentProps<"input">) {
  return (
    <input
      {...rest}
      className={style.checkBox + " " + rest.className}
      type="checkbox"
    />
  );
}

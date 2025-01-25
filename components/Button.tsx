import type React from "react";
import style from "@/css/component/button.module.css";
type Prop = {
  children: React.ReactNode;
  buttonType: "primary" | "secandary" | "disabled" | "danger";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
export default function Button({ children, buttonType, ...rest }: Prop) {
  return (
    <button
      className={style[buttonType]}
      {...rest}
    >
      <span>{children}</span>
    </button>
  );
}

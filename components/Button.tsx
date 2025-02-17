import type React from "react";
import style from "@/css/component/button.module.css";
type Prop = {
  children: React.ReactNode;
  buttonType: "primary" | "secandary" | "disabled" | "danger" | "link";
} & React.ComponentProps<"button">;
export default function Button({ children, buttonType, ...rest }: Prop) {
  return (
    <button
      {...rest}
      className={style[buttonType] + " " + rest.className}
    >
      <span>{children}</span>
    </button>
  );
}

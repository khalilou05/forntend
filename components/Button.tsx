import style from "@/css/button.module.css";
import type React from "react";
interface Prop extends React.ComponentProps<"button"> {
  children: React.ReactNode;
  buttonType: "primary" | "secandary" | "disabled" | "danger" | "link" | "icon";
}
export default function Button({ children, buttonType, ...rest }: Prop) {
  return (
    <button
      {...rest}
      className={`${style[buttonType]} ${rest.className ?? ""}`}
    >
      <span>{children}</span>
    </button>
  );
}

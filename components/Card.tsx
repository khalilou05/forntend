import style from "@/css/card.module.css";
import type React from "react";

interface Prop extends React.ComponentProps<"div"> {
  children: React.ReactNode;
  type?: "card" | "dropDown";
}
export default function Card({ children, type = "card", ...rest }: Prop) {
  return (
    <div
      {...rest}
      className={`${style[type]} ${rest.className ?? ""}`}
    >
      {children}
    </div>
  );
}

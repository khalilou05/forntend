import type React from "react";
import style from "@/css/component/card.module.css";

type Prop = {
  children: React.ReactNode;
  type?: "card" | "floating";
  title?: string;
  ref?: React.Ref<HTMLDivElement>;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;
export default function Card({
  children,
  title,
  ref,
  className = "",
  type = "card",
  ...rest
}: Prop) {
  return (
    <div
      ref={ref}
      className={`${style[type]} ${className}`}
      {...rest}
    >
      {title && <div className={style.title}>{title}</div>}
      {children}
    </div>
  );
}

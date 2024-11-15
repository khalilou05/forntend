import type React from "react";
import style from "@/css/component/card.module.css";
export default function Card({
  children,
  display = "block",
  gap = "0px",
  flexDirection = "row",
}: {
  children: React.ReactNode;
  gap?: string;
  flexDirection?: "row" | "column";
  display?: "flex" | "block";
}) {
  return (
    <div
      style={{ gap: gap, flexDirection: flexDirection, display: display }}
      className={style.card}
    >
      {children}
    </div>
  );
}

import type React from "react";
import style from "@/css/component/card.module.css";
export default function Card({
  children,
  className,
  display = "block",
  gap = "0px",
  flexDirection = "row",
}: {
  children: React.ReactNode;
  gap?: string;
  className?: string;

  flexDirection?: "row" | "column";
  display?: "flex" | "block";
}) {
  return (
    <div
      style={{ gap: gap, flexDirection: flexDirection, display: display }}
      className={`${style.card} ${className}`}
    >
      {children}
    </div>
  );
}

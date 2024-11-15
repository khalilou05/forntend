import type React from "react";
import style from "@/css/component/button.module.css";
type Prop = {
  children: React.ReactNode;
  className?: string;
  type: "primary" | "secandary" | "disabled" | "danger";
  padding?: string;
  borderRadius?: string;
  disabled?: boolean;
  onClick?: (...args: any) => void;
};
export default function Button({
  children,
  className,
  type,
  onClick,
  padding = "5px",
  borderRadius = "5px",
  disabled = false,
}: Prop) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      style={{ padding: padding, borderRadius: borderRadius }}
      className={`${style[type]} ${className}`}
    >
      <span>{children}</span>
    </button>
  );
}

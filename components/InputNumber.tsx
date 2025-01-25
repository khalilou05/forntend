import type React from "react";
import { type ReactNode } from "react";

import style from "@/css/component/input.module.css";
import Input from "./Input";

type Prop = {
  label?: string | ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>;
export default function InputNumber({ label, ...rest }: Prop) {
  return (
    <div className={style.inputLabel}>
      <Input {...rest} />
      <div className={style.label}>{label}</div>
    </div>
  );
}

"use client";
import type React from "react";
import { useState, type ReactNode } from "react";

import style from "@/css/component/input.module.css";
import Input from "./Input";

type Prop = {
  label?: string | ReactNode;
} & React.ComponentProps<"input">;
export default function InputNumber({ label, ...rest }: Prop) {
  const [value, setValue] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = Number(e.target.value);
    if (Number.isNaN(num)) return;
    setValue(num);
  };
  return (
    <div className={style.inputLabel}>
      <Input
        {...rest}
        value={value}
        onChange={(e) => {
          handleChange(e);
          rest.onChange?.(e);
        }}
      />
      <div className={style.label}>{label}</div>
    </div>
  );
}

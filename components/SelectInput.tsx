import React, { ReactNode } from "react";
import ArrowIcon from "@/assets/icons/selectArrow";
import style from "@/css/component/selectInput.module.css";
type Prop = {
  children?: ReactNode;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export default function SelectInput({ children, ...rest }: Prop) {
  return (
    <div className={style.select_warper}>
      <select {...rest}>{children}</select>
      <ArrowIcon size={"20px"} />
    </div>
  );
}

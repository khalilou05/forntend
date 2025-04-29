import ArrowIcon from "@/assets/icons/selectArrow";
import style from "@/css/selectInput.module.css";
import React from "react";

interface Prop extends React.ComponentProps<"select"> {}

export default function SelectInput({ children, ...rest }: Prop) {
  return (
    <div className={style.select_warper}>
      <select {...rest}>{children}</select>
      <ArrowIcon size={"20px"} />
    </div>
  );
}

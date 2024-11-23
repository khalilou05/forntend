import { ReactNode, type ChangeEvent } from "react";
import ArrowIcon from "@/assets/icons/selectArrow";
import style from "@/css/component/selectInput.module.css";
type Prop = {
  children?: ReactNode;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
};

export default function SelectInput({ children, onChange }: Prop) {
  return (
    <div className={style.select_warper}>
      <select onChange={onChange}>{children}</select>
      <ArrowIcon size={"20px"} />
    </div>
  );
}

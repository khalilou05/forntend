import DownCaret from "@/assets/icons/caretDown";
import UpCaret from "@/assets/icons/caretUp";
import { useState, type ChangeEvent } from "react";
import style from "@/css/component/inputNumberArrow.module.css";
import Input from "./Input";

type Prop = {
  onChange: (key: string, value: number) => void;
};
export default function InputNumberArrow({ onChange }: Prop) {
  const [value, setValue] = useState(0);
  const [isArrowVisible, setIsArrowVisible] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (!Number.isInteger(value)) return;
    setValue(value);
    onChange("global_stock", value);
  };

  const handleIncrement = () => {
    setValue((prv) => prv + 1);
  };
  const handleDecrement = () => {
    setValue((prv) => (prv <= 0 ? 0 : prv - 1));
  };
  const handleMouseEnter = () => {
    setIsArrowVisible(true);
  };
  const handleMouseLeave = () => {
    setIsArrowVisible(false);
  };
  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={style.warper}
    >
      <Input
        onChange={handleChange}
        value={value}
      />

      <div
        style={{ visibility: isArrowVisible ? "visible" : "hidden" }}
        className={style.btnWarper}
      >
        <button
          className={style.btn}
          tabIndex={-1}
          onClick={handleIncrement}
        >
          <UpCaret
            height={12}
            width={22}
          />
        </button>
        <button
          className={value === 0 ? style.btn_dis : style.btn}
          tabIndex={-1}
          onClick={handleDecrement}
        >
          <DownCaret
            height={12}
            width={22}
          />
        </button>
      </div>
    </div>
  );
}

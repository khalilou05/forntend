"use client";
import DownArrow from "@/assets/icons/caretDown";

import { Loop, QuestionIcon, Xicon } from "@/assets/icons";
import style from "@/css/input.module.css";
import React, { useRef } from "react";

import UpArrow from "@/assets/icons/upArrow";
import Spinner from "./Spinner";
import ToolTip from "./ToolTip";

interface InputProp extends React.ComponentProps<"input"> {}

export function Input({ ...rest }: InputProp) {
  return (
    <div className={style.baseInput}>
      <input
        {...rest}
        className={style.input}
      />
    </div>
  );
}
interface CurrencyInputProp extends InputProp {
  hintMessage?: string;
}

export function CurrencyInput({
  hintMessage,

  ...rest
}: CurrencyInputProp) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleClick = () => {
    inputRef.current?.focus();
  };
  return (
    <div className={style.currency_input}>
      <div
        onClick={handleClick}
        className={style.label}
      >
        دج
      </div>
      <input
        {...rest}
        ref={inputRef}
        className={style.input}
      />
      {hintMessage && (
        <div className={style.info}>
          <ToolTip
            value={hintMessage}
            component={(ref, handleMouseEnter, handleMouseLeave) => (
              <span
                className={style.icon}
                ref={ref}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <QuestionIcon />
              </span>
            )}
          />
        </div>
      )}
    </div>
  );
}
interface SearchInputProp extends InputProp {
  loopicon?: boolean;
  showxicon?: boolean;
  showspinner?: boolean;
  reset?: () => void;
}
export function SearchInput({
  showspinner,
  loopicon = true,
  showxicon,
  reset,
  ...rest
}: SearchInputProp) {
  return (
    <div className={style.search_input}>
      {loopicon && <Loop className={style.loop} />}
      <input
        {...rest}
        style={{ paddingRight: loopicon ? "30px" : "10px" }}
        className={style.input}
      />
      {showspinner && <Spinner className={style.left_icon} />}
      {showxicon && (
        <Xicon
          onClick={reset}
          className={style.left_icon}
        />
      )}
    </div>
  );
}
interface InputNumArrowProp extends InputProp {
  increment?: () => void;
  decrement?: () => void;
}
export function InputNumArrow({
  increment,
  decrement,
  ...rest
}: InputNumArrowProp) {
  return (
    <div className={style.arrow_input}>
      <input
        {...rest}
        type="number"
        className={style.input}
      />
      <div className={style.arrow_warper}>
        <button onClick={increment}>
          <UpArrow />
        </button>
        <button
          data-disbale={rest.value == "0" ? true : false}
          onClick={decrement}
        >
          <DownArrow />
        </button>
      </div>
    </div>
  );
}

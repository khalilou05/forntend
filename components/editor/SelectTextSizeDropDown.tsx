import DownCaretIcon from "@/assets/icons/downcaret";
import style from "@/css/component/editor.module.css";
import { useState } from "react";
import DropDown from "../DropDown";

export default function SelectTextSizeDropDown({
  applyFormat,
}: {
  applyFormat: (command: string, attr?: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropDown
      align="right"
      sameWidth
      component={(isOpen, ref, _, togleDropDown) => (
        <button
          className={style.btn}
          data-active={isOpen}
          ref={ref}
          onClick={togleDropDown}
        >
          حجم النص
          <DownCaretIcon size={20} />
        </button>
      )}
      renderChildren={(closeDropDown) => (
        <div onClick={() => closeDropDown()}>
          <p
            onClick={() => {
              applyFormat("fontSize", "1");
            }}
          >
            1
          </p>
          <p
            onClick={() => {
              applyFormat("fontSize", "2");
            }}
          >
            2
          </p>
          <p
            onClick={() => {
              applyFormat("fontSize", "3");
            }}
          >
            3
          </p>
          <p
            onClick={() => {
              applyFormat("fontSize", "4");
            }}
          >
            4
          </p>
          <p
            onClick={() => {
              applyFormat("fontSize", "5");
            }}
          >
            5
          </p>
          <p
            onClick={() => {
              applyFormat("fontSize", "6");
            }}
          >
            6
          </p>
          <p
            onClick={() => {
              applyFormat("fontSize", "7");
            }}
          >
            7
          </p>
        </div>
      )}
    />
  );
}

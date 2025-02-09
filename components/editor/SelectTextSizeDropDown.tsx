import { useState } from "react";
import DownCaretIcon from "@/assets/icons/downcaret";
import DropDown from "../DropDown";
import ToolTip from "../ToolTip";
import style from "@/css/component/editor.module.css";

export default function SelectTextSizeDropDown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState("عادي");

  return (
    <DropDown
      align="center"
      customWidth={100}
      component={(isOpen, ref, _, togleDropDown) => (
        <ToolTip
          show={!isOpen}
          value="حجم النص"
        >
          <button
            className={style.btn}
            data-open={isOpen}
            ref={ref}
            onClick={togleDropDown}
          >
            {selectedSize}
            <DownCaretIcon size={20} />
          </button>
        </ToolTip>
      )}
      renderChildren={() => <p>khalil</p>}
    />
  );
}

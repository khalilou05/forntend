import DownCaretIcon from "@/assets/icons/downcaret";
import TextColorIcon from "@/assets/icons/textcolor";

import style from "@/css/component/editor.module.css";
import ColorPicker from "../ColorPicker";
import DropDown from "../DropDown";
import ToolTip from "../ToolTip";

export default function SelectColorDropDown() {
  return (
    <DropDown
      align="center"
      sameWidth
      component={(isOpen, ref, _, togleDropDown) => (
        <ToolTip
          show={!isOpen}
          value="الألوان">
          <button
            data-open={isOpen}
            className={style.btn}
            ref={ref}
            onClick={togleDropDown}>
            <TextColorIcon size={20} />
            <DownCaretIcon size={20} />
          </button>
        </ToolTip>
      )}
      renderChildren={() => <ColorPicker />}
    />
  );
}

import DropDownWarper from "@/components/editor/DropDownWarper";
import TextColorIcon from "@/assets/icons/textcolor";
import DownCaretIcon from "@/assets/icons/downcaret";

import ColorPicker from "./ColorPicker";
import DropDown from "../DropDown";
import ToolTip from "../ToolTip";
import style from "@/css/component/editor.module.css";

export default function ColorBtn() {
  return (
    <DropDown
      align="center"
      customWidth={230}
      customHeith={270}
      component={(isOpen, ref, _, togleDropDown) => (
        <ToolTip
          show={!isOpen}
          value="الألوان"
        >
          <button
            data-open={isOpen}
            className={style.btn}
            ref={ref}
            onClick={togleDropDown}
          >
            <TextColorIcon size={20} />
            <DownCaretIcon size={20} />
          </button>
        </ToolTip>
      )}
      renderChildren={() => <ColorPicker />}
    />
  );
}

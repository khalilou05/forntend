import DownCaretIcon from "@/assets/icons/downcaret";
import TextColorIcon from "@/assets/icons/textcolor";

import { useWarperRef } from "@/context/WarperRefCtx";
import style from "@/css/editor.module.css";
import Card from "../Card";
import ColorPicker from "../ColorPicker";
import DropDown from "../DropDown";
import ToolTip from "../ToolTip";

export default function SelectColorDropDown() {
  const { warper } = useWarperRef();
  return (
    <DropDown<HTMLButtonElement>
      align="center"
      sameWidth
      component={(isOpen, ref, _, togleDropDown) => (
        <ToolTip
          parentRef={ref}
          show={!isOpen}
          value="الألوان"
          component={(ref, handleMouseEnter, handleMouseLeave) => (
            <button
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              data-open={isOpen}
              className={style.btn}
              ref={ref}
              onClick={togleDropDown}
            >
              <TextColorIcon size={20} />
              <DownCaretIcon size={20} />
            </button>
          )}
        />
      )}
      dropDown={(ref, styles, closeDropDown) => (
        <Card
          ref={ref}
          style={styles}
          type="dropDown"
        >
          <ColorPicker />
        </Card>
      )}
    />
  );
}

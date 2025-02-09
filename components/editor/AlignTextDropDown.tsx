import DownCaretIcon from "@/assets/icons/downcaret";
import style from "@/css/component/editor.module.css";

import AlignTextRightIcon from "@/assets/icons/aligntextright";
import AlignTextLeftIcon from "@/assets/icons/aligntextleft";
import AlignTextCenterIcon from "@/assets/icons/aligntextcenter";
import ToolTip from "../ToolTip";

import DropDown from "../DropDown";

export default function AlignTextBtn() {
  return (
    <DropDown
      padding="3px"
      component={(isOpen, ref, _, togleDropDown) => (
        <ToolTip
          show={!isOpen}
          value="إتجاه النص"
        >
          <button
            className={style.btn}
            data-open={isOpen}
            onClick={togleDropDown}
            ref={ref}
          >
            <AlignTextRightIcon size={20} />
            <DownCaretIcon size={20} />
          </button>
        </ToolTip>
      )}
      renderChildren={(closeDropDown) => (
        <>
          <ToolTip value="اليمين">
            <button
              onClick={closeDropDown}
              className={style.alignBtn}
            >
              <AlignTextRightIcon size={20} />
            </button>
          </ToolTip>
          <ToolTip value="الوسط">
            <button
              onClick={() => {
                document.execCommand("justifyCenter");
                closeDropDown();
              }}
              className={style.alignBtn}
            >
              <AlignTextCenterIcon size={20} />
            </button>
          </ToolTip>
          <ToolTip value="اليسار">
            <button className={style.alignBtn}>
              <AlignTextLeftIcon size={20} />
            </button>
          </ToolTip>
        </>
      )}
    />
  );
}

import DropDownWarper from "@/components/editor/DropDownWarper";
import DownCaretIcon from "@/assets/icons/downcaret";
import style from "@/css/component/editor.module.css";

import AlignTextRightIcon from "@/assets/icons/aligntextright";
import AlignTextLeftIcon from "@/assets/icons/aligntextleft";
import AlignTextCenterIcon from "@/assets/icons/aligntextcenter";
import ToolTip from "../ToolTip";
import { useState } from "react";

export default function AlignTextBtn() {
  const [isOpen, setIsOpen] = useState(false);
  const aplyPos = (value: string) => {
    document.execCommand(value);
    setIsOpen(false);
  };
  return (
    <DropDownWarper
      toolTipValue="إتجاه النص"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      icons={[<AlignTextRightIcon size={20} />, <DownCaretIcon size={20} />]}
    >
      <div className={style.textPosDrop}>
        <ToolTip value="اليمين">
          <button
            onClick={() => {
              aplyPos("justifyRight");
            }}
          >
            <AlignTextRightIcon size={20} />
          </button>
        </ToolTip>
        <ToolTip value="الوسط">
          <button
            onClick={() => {
              aplyPos("justifyCenter");
            }}
          >
            <AlignTextCenterIcon size={20} />
          </button>
        </ToolTip>
        <ToolTip value="اليسار">
          <button
            onClick={() => {
              aplyPos("justifyLeft");
            }}
          >
            <AlignTextLeftIcon size={20} />
          </button>
        </ToolTip>
      </div>
    </DropDownWarper>
  );
}

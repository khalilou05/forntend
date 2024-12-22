import DropDownWarper from "@/components/editor/DropDownWarper";
import TextColorIcon from "@/assets/icons/textcolor";
import DownCaretIcon from "@/assets/icons/downcaret";

import { useState } from "react";
import ColorPalette from "./ColorPalette";

export default function ColorBtn() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropDownWarper
      alignCenter={true}
      toolTipValue="الألوان"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      icons={[<TextColorIcon size={20} />, <DownCaretIcon size={20} />]}
    >
      <ColorPalette />
    </DropDownWarper>
  );
}

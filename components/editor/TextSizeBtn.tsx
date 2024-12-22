import { useState } from "react";
import DropDownWarper from "@/components/editor/DropDownWarper";
import DownCaretIcon from "@/assets/icons/downcaret";

export default function TextSizeBtn() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState("عادي");

  const textSizeList = [];
  return (
    <DropDownWarper
      toolTipValue="حجم النص"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      icons={[selectedSize, <DownCaretIcon size={20} />]}
    >
      <div>khalil</div>
    </DropDownWarper>
  );
}

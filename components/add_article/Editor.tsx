import style from "@/css/component/editor.module.css";
import DownCaretIcon from "@/assets/icons/downcaret";
import BoldTextIcon from "@/assets/icons/boldtext";
import ItalicTextIcon from "@/assets/icons/italictext";
import UnderLineTextIcon from "@/assets/icons/underlinetext";
import TextColorIcon from "@/assets/icons/textcolor";
import AlignTextRightIcon from "@/assets/icons/aligntextright";
import Image from "@/assets/icons/image";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Product } from "@/types/types";
import ToolTip from "../ToolTip";
const Editor = ({
  handleProductUpdate,
}: {
  handleProductUpdate: (
    prop: keyof Product,
    value: string | number | boolean
  ) => void;
}) => {
  const [expandElemnt, setexpandElemnt] = useState("");
  const [textSizePos, settextSizePos] = useState({ x: 0, y: 0 });
  const [textColorPos, settextColorPos] = useState({ x: 0, y: 0 });
  const [textAlignePos, settextAlignePos] = useState({ x: 0, y: 0 });
  const textSizeBtn = useRef<HTMLButtonElement | null>(null);
  const textColorBtn = useRef<HTMLButtonElement | null>(null);
  const textAlignBtn = useRef<HTMLButtonElement | null>(null);

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    value: string
  ) => {
    const { left, bottom } = e.currentTarget.getBoundingClientRect();
    if (value === "size") {
      settextSizePos({ x: left + window.scrollX, y: bottom + window.scrollY });
    }
    if (value === "align") {
      settextAlignePos({
        x: left + window.scrollX,
        y: bottom + window.scrollY,
      });
    }
    if (value === "color") {
      settextColorPos({ x: left + window.scrollX, y: bottom + window.scrollY });
    }
    setexpandElemnt(value);
  };

  useEffect(() => {
    const handleMouseDown = () => {
      setexpandElemnt("");
    };
    window.addEventListener("mousedown", handleMouseDown);

    return () => window.removeEventListener("mousedown", handleMouseDown);
  }, []);

  return (
    <>
      <label className={style.label}>الوصف</label>
      <div className={style.warper}>
        <div className={style.tool_bar}>
          <button
            onClick={(e) => handleClick(e, "size")}
            ref={textSizeBtn}
          >
            حجم النص
            <DownCaretIcon size={20} />
          </button>

          {expandElemnt === "size" &&
            createPortal(
              <div
                style={{
                  top: textSizePos.y,
                  left: textSizePos.x,
                  position: "absolute",
                  backgroundColor: "white",
                  zIndex: 100,
                }}
              >
                khalil
              </div>,
              document.body
            )}
          <ToolTip value="خط غليض">
            <button onClick={() => setexpandElemnt("")}>
              <BoldTextIcon size={20} />
            </button>
          </ToolTip>
          <ToolTip value="خط مائل">
            <button>
              <ItalicTextIcon size={20} />
            </button>
          </ToolTip>
          <ToolTip value="خط مسطر">
            <button>
              <UnderLineTextIcon size={20} />
            </button>
          </ToolTip>
          <ToolTip value="الألوان">
            <button>
              <TextColorIcon size={20} />
              <DownCaretIcon size={20} />
            </button>
          </ToolTip>
          <ToolTip value="إتجاه النص">
            <button>
              <AlignTextRightIcon size={20} />
              <DownCaretIcon size={20} />
            </button>
          </ToolTip>

          <ToolTip value="إضافة صور">
            <button>
              <Image size={20} />
            </button>
          </ToolTip>
        </div>
        <div
          onInput={(e) =>
            // todo debounce this for performence
            handleProductUpdate("description", e.currentTarget.innerText)
          }
          className={style.editor}
          contentEditable
        />
      </div>
    </>
  );
};

export default Editor;

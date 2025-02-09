import style from "@/css/component/editor.module.css";
import BoldTextIcon from "@/assets/icons/boldtext";
import ItalicTextIcon from "@/assets/icons/italictext";
import UnderLineTextIcon from "@/assets/icons/underlinetext";
import AddLinkBtn from "./AddLinkModal";
import BanIcon from "@/assets/icons/ban";
import ListIcon from "@/assets/icons/list";
import ListNumIcon from "@/assets/icons/listNumber";
import AlignTextBtn from "@/components/editor/AlignTextDropDown";
import ImageIcon from "@/assets/icons/image";
import AddVideoBtn from "@/components/editor/AddVideoModal";
import TextSizeBtn from "@/components/editor/SelectTextSizeDropDown";
import ColorBtn from "@/components/editor/SelectColorDropDown";
import React, { useEffect, useRef, useState } from "react";

import type { Product } from "@/types/types";
import ToolTip from "../ToolTip";

type Prop = {
  openImgModal: () => void;
  ref: React.RefObject<HTMLDivElement | null>;
};

export default function Editor({ openImgModal, ref }: Prop) {
  const [hasSelected, setHasSelected] = useState(false);
  const [savedSelection, setSavedSelection] = useState<Range | null>(null);

  const addImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const images = Array.from(e.target.files);
    const formData = new FormData();
    for (const image of images) {
      formData.append("image", image);
    }
  };

  const addVideo = (value: string) => {
    console.log(window.getSelection()?.getRangeAt(0));
  };

  const hasSelectedText = () => {
    if (window.getSelection()?.toString().trim().length) {
      setHasSelected(true);
    } else {
      setHasSelected(false);
    }
  };

  const format = () => {
    const selection = window.getSelection();
    if (selection?.rangeCount === 0) return;
    const rangeSelection = selection?.getRangeAt(0);
    const parent =
      rangeSelection?.startContainer.nodeType === Node.TEXT_NODE
        ? rangeSelection?.startContainer.parentNode
        : rangeSelection?.startContainer;
    if (parent?.nodeName === "STRONG") {
      const element = document.createTextNode(rangeSelection?.toString() || "");
      parent.parentNode?.replaceChild(element, parent);
      rangeSelection?.selectNode(element);
    } else {
      const element = document.createElement("strong");
      rangeSelection?.surroundContents(element);
    }
  };

  const test = () => {
    const selec = window.getSelection();
    if (!selec?.rangeCount) return;
    const range = selec?.getRangeAt(0);
    if (range.collapsed) return;
    const textNode = selec.anchorNode;
    if (textNode?.parentElement?.tagName === "STRONG") {
      const text = range.extractContents();
    } else {
      const bold = document.createElement("strong");
      range.surroundContents(bold);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Backspace") {
      return;
      const elemnt = document.createElement("p");
      elemnt.innerHTML = "<br />";
      ref.current?.appendChild(elemnt);
      document.getSelection()?.setPosition(elemnt);
    }
  };

  return (
    <>
      <label className={style.label}>الوصف</label>

      <div className={style.warper}>
        <div className={style.tool_bar}>
          <TextSizeBtn />
          <div className={style.dividor}></div>
          <ToolTip value="خط غليض">
            <button
              className={style.btn}
              onClick={() => {
                test();
              }}
            >
              <BoldTextIcon size={20} />
            </button>
          </ToolTip>
          <ToolTip value="خط مائل">
            <button
              className={style.btn}
              onClick={() => {
                document.execCommand("italic");
              }}
            >
              <ItalicTextIcon size={20} />
            </button>
          </ToolTip>
          <ToolTip value="خط مسطر">
            <button
              className={style.btn}
              onClick={() => {
                document.execCommand("underline");
              }}
            >
              <UnderLineTextIcon size={20} />
            </button>
          </ToolTip>

          <div className={style.dividor}></div>
          <ColorBtn />
          <div className={style.dividor}></div>
          <AlignTextBtn />

          <div className={style.dividor}></div>
          <AddLinkBtn hasSelected={hasSelected} />
          <ToolTip value="إضافة صور">
            <button
              onClick={openImgModal}
              className={style.btn}
            >
              <ImageIcon size={20} />
            </button>
          </ToolTip>
          <AddVideoBtn addVideo={addVideo} />
          <div className={style.dividor}></div>
          <ToolTip value="قائمة نقاط">
            <button
              onClick={() => document.execCommand("insertUnorderedList")}
              className={style.btn}
            >
              <ListIcon size={20} />
            </button>
          </ToolTip>
          <ToolTip value="قائمة أرقام">
            <button
              onClick={() => document.execCommand("insertOrderedList")}
              className={style.btn}
            >
              <ListNumIcon size={20} />
            </button>
          </ToolTip>

          <ToolTip value="إزالة التنسيق">
            <button
              onClick={() => document.execCommand("removeFormat")}
              className={style.btn}
            >
              <BanIcon size={20} />
            </button>
          </ToolTip>
        </div>
        <div
          suppressContentEditableWarning
          ref={ref}
          onKeyDown={handleKeyDown}
          onKeyUp={hasSelectedText}
          onMouseUp={hasSelectedText}
          className={style.editor}
          contentEditable
        >
          <p>
            <br />
          </p>
        </div>
      </div>
    </>
  );
}

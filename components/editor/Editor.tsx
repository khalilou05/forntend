import style from "@/css/component/editor.module.css";
import BoldTextIcon from "@/assets/icons/boldtext";
import ItalicTextIcon from "@/assets/icons/italictext";
import UnderLineTextIcon from "@/assets/icons/underlinetext";
import AddLinkBtn from "./AddLinkBtn";
import BanIcon from "@/assets/icons/ban";
import ListIcon from "@/assets/icons/list";
import ListNumIcon from "@/assets/icons/listNumber";
import AlignTextBtn from "@/components/editor/AlignTextBtn";
import AddImageBtn from "@/components/editor/AddImageBtn";
import AddVideoBtn from "@/components/editor/AddVideoBtn";
import TextSizeBtn from "@/components/editor/TextSizeBtn";
import ColorBtn from "@/components/editor/ColorBtn";
import React, { useEffect, useRef, useState } from "react";

import type { Product } from "@/types/types";
import ToolTip from "../ToolTip";

export default function Editor({
  handleProductUpdate,
}: {
  handleProductUpdate: (
    prop: keyof Product,
    value: string | number | boolean,
  ) => void;
}) {
  const [bold, setBold] = useState(false);
  const [hasSelected, setHasSelected] = useState(false);

  const editor = useRef<HTMLDivElement | null>(null);

  const addImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const images = Array.from(e.target.files);
    const formData = new FormData();
    for (const image of images) {
      formData.append("image", image);
    }
  };

  const handleInput = () => {
    const first = editor.current?.firstChild;
    if (!first) {
      const p = document.createElement("p");
      p.innerHTML = "<br/>";
      editor.current?.appendChild(p);
      window.getSelection()?.setPosition(p);
    }
  };

  const addVideo = (value: string) => {
    editor.current?.insertAdjacentHTML("beforeend", value);
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

  const findParentElement = (element: HTMLElement) => {
    let current;
    while (element.parentNode?.nodeName !== "STRONG") {
      current = element.parentNode;
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
              data-active={bold}
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
          <AddImageBtn />
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
          ref={editor}
          onInput={handleInput}
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

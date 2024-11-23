import style from "@/css/component/editor.module.css";
import DownCaretIcon from "@/assets/icons/downcaret";
import BoldTextIcon from "@/assets/icons/boldtext";
import ItalicTextIcon from "@/assets/icons/italictext";
import UnderLineTextIcon from "@/assets/icons/underlinetext";
import TextColorIcon from "@/assets/icons/textcolor";
import AlignTextRightIcon from "@/assets/icons/aligntextright";
import AlignTextLeftIcon from "@/assets/icons/aligntextleft";
import AlignTextCenterIcon from "@/assets/icons/aligntextcenter";

import Image from "@/assets/icons/image";
import React, { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
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
  const editor = useRef<HTMLDivElement | null>(null);

  const makeBold = () => {
    const selection = window.getSelection();
    if (selection?.rangeCount === 0) return;
    const range = selection?.getRangeAt(0);
    const start = range?.startContainer;
    const end = range?.endContainer;
    if (start !== end && range?.commonAncestorContainer) {
      const treeWlaker = document.createTreeWalker(
        range?.commonAncestorContainer,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode(node) {
            return range.intersectsNode(node)
              ? NodeFilter.FILTER_ACCEPT
              : NodeFilter.FILTER_REJECT;
          },
        },
      );
      const nodeToWarp = [];
      while (treeWlaker.nextNode()) {
        nodeToWarp.push(treeWlaker.currentNode);
      }
      console.log(nodeToWarp);

      // nodeToWarp.forEach((item) => {
      //   const bold = document.createElement("b");
      //   item.parentNode?.replaceChild(bold, item);
      //   bold.appendChild(item);
      // });
    } else {
    }

    // const parentBold = range?.commonAncestorContainer.parentNode;
    // const parentNode = parentBold?.parentElement;

    // if (parentBold?.nodeName === "B" && parentBold.firstChild) {
    //   parentNode?.insertBefore(parentBold.firstChild, parentBold);
    //   parentNode?.removeChild(parentBold);
    //   selection?.removeAllRanges();

    //   return;
    // }

    // const elem = document.createElement("b");
    // range?.surroundContents(elem);
    // selection?.removeAllRanges();
  };

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

  return (
    <>
      <label className={style.label}>الوصف</label>
      <div className={style.warper}>
        <div className={style.tool_bar}>
          <ToolTip padding="7px 10px" value="حجم النص">
            <button className={style.txtSize}>
              عادي
              <DownCaretIcon size={20} />
            </button>
          </ToolTip>
          <div className={style.dividor}></div>
          <ToolTip value="خط غليض">
            <button onClick={makeBold}>
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
          <BtnDropDown toolTipValue="الألوان">
            <TextColorIcon size={20} />
            <DownCaretIcon size={20} />
          </BtnDropDown>
          <div className={style.dividor}></div>
          <BtnDropDown
            dropcomponent={<TextPosDropDown />}
            toolTipValue="إتجاه النص"
          >
            <AlignTextRightIcon size={20} />
            <DownCaretIcon size={20} />
          </BtnDropDown>

          <div className={style.dividor}></div>

          <ToolTip value="إضافة صور">
            <button>
              <Image size={20} />
            </button>
          </ToolTip>
        </div>
        <div
          suppressContentEditableWarning
          ref={editor}
          onInput={handleInput}
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

function BtnDropDown({
  children,
  toolTipValue,
  tooltipPosition = "center",
  dropcomponent,
}: {
  children: ReactNode;
  toolTipValue: string;
  tooltipPosition?: "center" | "left" | "right";
  dropcomponent?: ReactNode;
}) {
  const [expand, setExpand] = useState(false);
  const [dropDownPosition, setDropDownPosition] = useState({ top: 0, left: 0 });
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const dropRef = useRef<HTMLDivElement | null>(null);

  const togleExpand = () => {
    setExpand(!expand);
  };

  const handleClick = () => {
    if (btnRef.current) {
      const { top, left, height } = btnRef.current?.getBoundingClientRect();
      setDropDownPosition({
        left: left,
        top: top + height + window.scrollY + 5,
      });
    }
    togleExpand();
  };
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (
        !btnRef.current?.contains(e.target as Node) &&
        !dropRef.current?.contains(e.target as Node)
      )
        togleExpand();
    };
    const handleClose = () => {
      if (!dropRef.current) return;
      const { top } = dropRef.current?.getBoundingClientRect();
      if (window.scrollY > top + window.scrollY) setExpand(false);
    };
    if (expand) {
      window.addEventListener("mousedown", handleMouseDown);
      window.addEventListener("scrollend", handleClose);
    }
    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("scrollend", handleClose);
    };
  }, [expand]);
  return (
    <>
      <ToolTip
        show={!expand}
        tooltipPosition={tooltipPosition}
        value={toolTipValue}
      >
        <button data-expand={expand} ref={btnRef} onClick={handleClick}>
          {children}
        </button>
      </ToolTip>
      {expand &&
        createPortal(
          <div
            ref={dropRef}
            style={{
              position: "absolute",
              zIndex: 100,
              top: dropDownPosition.top,
              left: dropDownPosition.left,
            }}
          >
            {dropcomponent}
          </div>,
          document.body,
        )}
    </>
  );
}

function TextPosDropDown() {
  return (
    <div className={style.textPosDrop}>
      <ToolTip value="اليمين">
        <button>
          <AlignTextRightIcon size={20} />
        </button>
      </ToolTip>
      <ToolTip value="الوسط">
        <button>
          <AlignTextCenterIcon size={20} />
        </button>
      </ToolTip>
      <ToolTip value="اليسار">
        <button>
          <AlignTextLeftIcon size={20} />
        </button>
      </ToolTip>
    </div>
  );
}

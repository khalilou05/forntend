import style from "@/css/component/editor.module.css";
import DownCaretIcon from "@/assets/icons/downcaret";
import BoldTextIcon from "@/assets/icons/boldtext";
import ItalicTextIcon from "@/assets/icons/italictext";
import UnderLineTextIcon from "@/assets/icons/underlinetext";
import TextColorIcon from "@/assets/icons/textcolor";
import AlignTextRightIcon from "@/assets/icons/aligntextright";
import AlignTextLeftIcon from "@/assets/icons/aligntextleft";
import AlignTextCenterIcon from "@/assets/icons/aligntextcenter";
import LinkIcon from "@/assets/icons/link";
import BanIcon from "@/assets/icons/ban";
import VideoIcon from "@/assets/icons/video";
import ListIcon from "@/assets/icons/list";
import ListNumIcon from "@/assets/icons/listNumber";

import Image from "@/assets/icons/image";
import React, { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import type { Product } from "@/types/types";
import ToolTip from "../ToolTip";
import Modal from "../Modal";
export default function Editor({
  handleProductUpdate,
}: {
  handleProductUpdate: (
    prop: keyof Product,
    value: string | number | boolean,
  ) => void;
}) {
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);
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
          <TextSizeBtn />
          <div className={style.dividor}></div>
          <ToolTip value="خط غليض">
            <button
              className={style.btn}
              data-active={bold}
              onClick={() => setBold(!bold)}
            >
              <BoldTextIcon size={20} />
            </button>
          </ToolTip>
          <ToolTip value="خط مائل">
            <button
              className={style.btn}
              onClick={() => setItalic(!italic)}
              data-active={italic}
            >
              <ItalicTextIcon size={20} />
            </button>
          </ToolTip>
          <ToolTip value="خط مسطر">
            <button
              className={style.btn}
              data-active={underline}
              onClick={() => setUnderline(!underline)}
            >
              <UnderLineTextIcon size={20} />
            </button>
          </ToolTip>

          <div className={style.dividor}></div>
          <ColorBtn />
          <div className={style.dividor}></div>
          <TextPosBtn />
          <div className={style.dividor}></div>
          <Modal
            cancelValue="إلغاء"
            modalTitle="إضافة رابط"
            submitValue="إضافة"
            height={100}
            render={(handleClick) => (
              <ToolTip value="إضافة رابط">
                <button className={style.btn} onClick={handleClick}>
                  <LinkIcon size={20} />
                </button>
              </ToolTip>
            )}
          >
            <p>khalil</p>
          </Modal>

          <ToolTip value="إضافة صور">
            <button className={style.btn}>
              <Image size={20} />
            </button>
          </ToolTip>
          <ToolTip value="إضافة فيديو">
            <button className={style.btn}>
              <VideoIcon size={20} />
            </button>
          </ToolTip>
          <div className={style.dividor}></div>
          <ToolTip value="قائمة نقاط">
            <button className={style.btn}>
              <ListIcon size={20} />
            </button>
          </ToolTip>
          <ToolTip value="قائمة أرقام">
            <button className={style.btn}>
              <ListNumIcon size={20} />
            </button>
          </ToolTip>

          <ToolTip value="إزالة التنسيق">
            <button className={style.btn}>
              <BanIcon size={20} />
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
  isOpen,
  setIsOpen,
  children,
  toolTipValue,
  tooltipPosition = "center",
  icons,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  children: ReactNode;
  toolTipValue: string;
  tooltipPosition?: "center" | "left";
  icons: ReactNode[];
}) {
  const [dropDownPosition, setDropDownPosition] = useState({ top: 0, left: 0 });
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const dropRef = useRef<HTMLDivElement | null>(null);

  const togleExpand = () => {
    setIsOpen(!isOpen);
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
      if (window.scrollY > top + window.scrollY) setIsOpen(false);
    };
    if (isOpen) {
      window.addEventListener("mousedown", handleMouseDown);
      window.addEventListener("scrollend", handleClose);
    }
    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("scrollend", handleClose);
    };
  }, [isOpen]);
  return (
    <>
      <ToolTip
        show={!isOpen}
        tooltipPosition={tooltipPosition}
        value={toolTipValue}
      >
        <button
          className={style.btn}
          data-active={isOpen}
          ref={btnRef}
          onClick={handleClick}
        >
          {icons.map((icon, i) => (
            <span key={i}>{icon}</span>
          ))}
        </button>
      </ToolTip>
      {isOpen &&
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
            {children}
          </div>,
          document.body,
        )}
    </>
  );
}

function TextPosBtn() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <BtnDropDown
      toolTipValue="إتجاه النص"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      icons={[<AlignTextRightIcon size={20} />, <DownCaretIcon size={20} />]}
    >
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
    </BtnDropDown>
  );
}

function ColorBtn() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <BtnDropDown
      toolTipValue="لون النص"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      icons={[<TextColorIcon size={20} />, <DownCaretIcon size={20} />]}
    >
      <div>khalil</div>
    </BtnDropDown>
  );
}
function TextSizeBtn() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState("عادي");

  const textSizeList = [];
  return (
    <BtnDropDown
      toolTipValue="حجم النص"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      icons={[selectedSize, <DownCaretIcon size={20} />]}
    >
      <div>khalil</div>
    </BtnDropDown>
  );
}

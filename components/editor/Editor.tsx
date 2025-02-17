import style from "@/css/component/editor.module.css";
import BoldTextIcon from "@/assets/icons/boldtext";
import ItalicTextIcon from "@/assets/icons/italictext";
import UnderLineTextIcon from "@/assets/icons/underlinetext";
import AddLinkBtn from "./AddLinkModal";
import BanIcon from "@/assets/icons/ban";
import ListIcon from "@/assets/icons/list";
import ListNumIcon from "@/assets/icons/listNumber";

import ImageIcon from "@/assets/icons/image";
import AddVideoBtn from "@/components/editor/AddVideoModal";
import TextSizeBtn from "@/components/editor/SelectTextSizeDropDown";
import ColorBtn from "@/components/editor/SelectColorDropDown";
import AlignTextRightIcon from "@/assets/icons/aligntextright";
import AlignTextLeftIcon from "@/assets/icons/aligntextleft";
import AlignTextCenterIcon from "@/assets/icons/aligntextcenter";
import DownCaretIcon from "@/assets/icons/downcaret";

import React, { useEffect, useRef, useState } from "react";

import ToolTip from "../ToolTip";
import DropDown from "../DropDown";

type Prop = {
  openImgModal: () => void;
  ref: React.RefObject<HTMLDivElement | null>;
};

export default function Editor({ openImgModal, ref }: Prop) {
  const [hasSelected, setHasSelected] = useState(false);
  const [value, setValue] = useState("");
  const [textFormat, setTextFormat] = useState({
    isBold: false,
    isItalic: false,
    isUnderLine: false,
  });
  const [savedSelection, setSavedSelection] = useState<Range | null>(null);
  const selectedImg = useRef<HTMLImageElement | null>(null);
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

  const handleBeforInput = () => {
    if (!ref.current?.firstChild) {
      ref.current?.insertAdjacentHTML(
        "beforeend",
        "<p><br data-mce='1' /></p>"
      );
    }
  };

  const handleMouseDown = () => {
    const selec = window.getSelection();
    if (selec?.rangeCount && selec?.rangeCount > 0) {
      const elem = selec?.getRangeAt(0).commonAncestorContainer.parentElement;
      console.log(elem);

      if (elem?.nodeName.toLowerCase() === "b")
        setTextFormat((prv) => ({ ...prv, isBold: true }));
      else setTextFormat((prv) => ({ ...prv, isBold: false }));
    }
  };

  const togleBold = () => {
    document.execCommand("bold");
    ref.current?.focus();
  };

  // const handleKeyDow = (e: React.KeyboardEvent) => {
  //   if (e.key === "Enter") {
  //     e.preventDefault();
  //     const p = document.createElement("p");
  //     p.insertAdjacentHTML("beforeend", "<br />");
  //     ref.current?.appendChild(p);
  //     window.getSelection()?.setPosition(p);
  //   }
  // };

  // const checkIsParentBold = () => {
  //   const nodeName = window.getSelection()?.getRangeAt(0)
  //     .commonAncestorContainer.parentNode?.nodeName;
  //   console.log(nodeName);

  //   if (nodeName === "B" || nodeName === "STRONG")
  //     setTextFormat((prv) => ({ ...prv, isBold: true }));
  //   if (nodeName === "I") setTextFormat((prv) => ({ ...prv, isItalic: true }));
  //   else setTextFormat({ isBold: false, isItalic: false, isUnderLine: false });
  //   // if (nodeName === "I") setTextFormat((prv) => ({ ...prv, isItalic: true }));
  // };

  // useEffect(() => {
  //   console.log(isBold);
  // }, [isBold]);

  const Customformat = (command: string) => {
    document.execCommand(command);
    ref.current?.focus();
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
              data-active={textFormat.isBold}
              className={style.btn}
              onClick={togleBold}
            >
              <BoldTextIcon size={20} />
            </button>
          </ToolTip>
          <ToolTip value="خط مائل">
            <button
              data-active={textFormat.isItalic}
              className={style.btn}
              onClick={() => {
                Customformat("italic");
              }}
            >
              <ItalicTextIcon size={20} />
            </button>
          </ToolTip>
          <ToolTip value="خط مسطر">
            <button
              data-active={textFormat.isUnderLine}
              className={style.btn}
              onClick={() => {
                Customformat("underline");
              }}
            >
              <UnderLineTextIcon size={20} />
            </button>
          </ToolTip>

          <div className={style.dividor}></div>
          <ColorBtn />
          <div className={style.dividor}></div>
          <DropDown
            padding="3px"
            component={(isOpen, ref, _, togleDropDown) => (
              <ToolTip
                show={!isOpen}
                value="إتجاه النص"
              >
                <button
                  className={style.btn}
                  data-active={isOpen}
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
                    onClick={() => {
                      Customformat("justifyRight");
                      closeDropDown();
                    }}
                    className={style.alignBtn}
                  >
                    <AlignTextRightIcon size={20} />
                  </button>
                </ToolTip>
                <ToolTip value="الوسط">
                  <button
                    onClick={() => {
                      Customformat("justifyCenter");
                      closeDropDown();
                    }}
                    className={style.alignBtn}
                  >
                    <AlignTextCenterIcon size={20} />
                  </button>
                </ToolTip>
                <ToolTip value="اليسار">
                  <button
                    onClick={() => {
                      Customformat("justifyLeft");
                      closeDropDown();
                    }}
                    className={style.alignBtn}
                  >
                    <AlignTextLeftIcon size={20} />
                  </button>
                </ToolTip>
              </>
            )}
          />

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
              onClick={() => Customformat("insertUnorderedList")}
              className={style.btn}
            >
              <ListIcon size={20} />
            </button>
          </ToolTip>
          <ToolTip value="قائمة أرقام">
            <button
              onClick={() => Customformat("insertOrderedList")}
              className={style.btn}
            >
              <ListNumIcon size={20} />
            </button>
          </ToolTip>

          <ToolTip value="إزالة التنسيق">
            <button
              onClick={() => Customformat("removeFormat")}
              className={style.btn}
            >
              <BanIcon size={20} />
            </button>
          </ToolTip>
        </div>
        <div
          suppressContentEditableWarning
          ref={ref}
          onBeforeInput={handleBeforInput}
          // onKeyDown={handleKeyDow}
          // onMouseDown={handleMouseDown}
          // onmou={checkIsParentBold}
          // onKeyUp={hasSelectedText}
          // onMouseUp={checkIsParentBold}
          // onInput={checkIsParentBold}
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

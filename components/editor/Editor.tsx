"use client";
import BanIcon from "@/assets/icons/ban";
import BoldTextIcon from "@/assets/icons/boldtext";
import ItalicTextIcon from "@/assets/icons/italictext";
import ListIcon from "@/assets/icons/list";
import ListNumIcon from "@/assets/icons/listNumber";
import UnderLineTextIcon from "@/assets/icons/underlinetext";
import style from "@/css/editor.module.css";
import AddLinkBtn from "./AddLinkModal";

import RedoIco from "@/assets/icons/Redo";
import UndoIco from "@/assets/icons/Undo";
import AlignTextCenterIcon from "@/assets/icons/aligntextcenter";
import ImgIco from "@/assets/icons/image";

import AlignTextLeftIcon from "@/assets/icons/aligntextleft";
import AlignTextRightIcon from "@/assets/icons/aligntextright";
import DownCaretIcon from "@/assets/icons/downcaret";
import AddVideoBtn from "@/components/editor/AddVideoModal";
import ColorBtn from "@/components/editor/SelectColorDropDown";

import TextSizeBtn from "@/components/editor/SelectTextSizeDropDown";

import { useEffect, useRef, useState } from "react";

import type { Media } from "@/types/types";
import DropDown from "../DropDown";
import ToolTip from "../ToolTip";

import { useAddPrdCtx } from "@/context/AddProductCtx";
import { useImgModalCtx } from "@/context/ImgModalCtx";
import Card from "../Card";

export default function Editor() {
  const editorRef = useRef<HTMLIFrameElement | null>(null);
  const [hasFocus, setHasFocus] = useState(false);

  const { handleProductUpdate } = useAddPrdCtx();
  const { openImgModal } = useImgModalCtx();

  const addVideo = (value: string) => {
    editorRef.current?.contentWindow?.document.body?.insertAdjacentHTML(
      "beforeend",
      value
    );
  };

  const addImgToEditor = (medias: Media[]) => {
    for (const media of medias) {
      if (media.type === "video") {
        editorRef.current?.contentWindow?.document.body?.insertAdjacentHTML(
          "beforeend",
          `<video width="95%" controls src=${media.url}></video>`
        );
      } else {
        editorRef.current?.contentWindow?.document.body?.insertAdjacentHTML(
          "beforeend",
          `<p>
            <img width="95%"  src=${media.url} />
          </p>`
        );
      }
    }
  };

  const applyFormat = (command: string, attr?: string) => {
    const ifrm = editorRef.current?.contentWindow;

    ifrm?.document.body.focus();
    ifrm?.document.execCommand(command, false, attr);
  };

  const applyFormat2 = (whatToTogle: string) => {
    const selection = window.getSelection();
    if (selection?.rangeCount === 0) {
      console.log("range count is 0");

      return;
    }
    const range = selection?.getRangeAt(0);
    if (range?.collapsed) return;
    if (range?.startContainer === range?.endContainer) {
      console.log("not single line selection");

      return;
    }
    // multiline format
    if (!editorRef.current?.contentWindow?.document.body) return;
    console.log("multilie selection");

    const treeWalker = document.createTreeWalker(
      editorRef.current?.contentWindow?.document.body,
      NodeFilter.SHOW_TEXT
    );

    while (treeWalker.nextNode()) {
      const currentNode = treeWalker.currentNode;
      if (range?.intersectsNode(currentNode)) {
        const isHisParent = currentNode.parentElement?.nodeName === whatToTogle;
        if (isHisParent) {
          editorRef.current?.contentWindow?.document.body.replaceChild(
            currentNode.parentElement,
            currentNode
          );
          return;
        }
        const newElm = document.createElement(whatToTogle);
        newElm.appendChild(currentNode);
        editorRef.current?.contentWindow?.document.body.replaceChild(
          currentNode,
          newElm
        );
      }
    }
  };

  useEffect(() => {
    const iframe = editorRef.current?.contentWindow;

    const abrtctrl = new AbortController();
    setTimeout(() => {
      iframe?.document.body.addEventListener(
        "input",
        (e) => {
          if (!iframe.document.body.firstChild) {
            const p = iframe.document.createElement("p");
            p.innerHTML = "<br>";
            iframe.document.body.appendChild(p);
            iframe.document.getSelection()?.setPosition(p);
          }
        },
        { signal: abrtctrl.signal }
      );
    }, 50);
    iframe?.addEventListener(
      "focus",
      () => {
        setHasFocus(true);
      },
      { signal: abrtctrl.signal }
    );
    iframe?.addEventListener(
      "blur",
      () => {
        setHasFocus(false);
      },
      { signal: abrtctrl.signal }
    );
    iframe?.document.body.addEventListener(
      "input",
      (e) => {
        handleProductUpdate("description", (e.target as HTMLElement).innerHTML);
      },
      { signal: abrtctrl.signal }
    );
    return () => abrtctrl.abort();
  }, []);

  return (
    <>
      <label className={style.label}>الوصف</label>

      <div className={hasFocus ? style.warper__focus : style.warper}>
        <div className={style.tool_bar}>
          <TextSizeBtn applyFormat={applyFormat} />
          <div className={style.dividor}></div>
          <ToolTip
            value="خط غليض"
            component={(ref, handleMouseEnter, handleMouseLeave) => (
              <button
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                ref={ref}
                className={style.btn}
                onClick={() => applyFormat2("STRONG")}
              >
                <BoldTextIcon />
              </button>
            )}
          />

          <ToolTip
            value="خط مائل"
            component={(ref, handleMouseEnter, handleMouseLeave) => (
              <button
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                ref={ref}
                className={style.btn}
                onClick={() => {
                  applyFormat("italic");
                }}
              >
                <ItalicTextIcon size={20} />
              </button>
            )}
          />

          <ToolTip
            value="خط مسطر"
            component={(ref, handleMouseEnter, handleMouseLeave) => (
              <button
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                ref={ref}
                className={style.btn}
                onClick={() => {
                  applyFormat("underline");
                }}
              >
                <UnderLineTextIcon size={20} />
              </button>
            )}
          />

          <div className={style.dividor}></div>
          <ColorBtn />
          <div className={style.dividor}></div>
          <DropDown
            sameWidth
            component={(isOpen, parRef, _, togleDropDown) => (
              <ToolTip
                show={!isOpen}
                value="إتجاه النص"
                parentRef={parRef}
                component={(ref, handleMouseEnter, handleMouseLeave) => (
                  <button
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    style={{ paddingInline: "0px" }}
                    className={style.btn}
                    data-active={isOpen}
                    onClick={togleDropDown}
                    ref={ref}
                  >
                    <AlignTextRightIcon size={20} />
                    <DownCaretIcon size={20} />
                  </button>
                )}
              />
            )}
            dropDown={(ref, styles, closeDropDown) => (
              <Card
                ref={ref}
                style={{ ...styles }}
                className={style.alignTxtDrpdwn}
                onClick={closeDropDown}
                type="dropDown"
              >
                <ToolTip
                  value="اليمين"
                  component={(ref, handleMouseEnter, handleMouseLeave) => (
                    <button
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      ref={ref}
                      onClick={() => applyFormat("justifyRight")}
                      className={style.alignBtn}
                    >
                      <AlignTextRightIcon size={20} />
                    </button>
                  )}
                />

                <ToolTip
                  value="الوسط"
                  component={(ref, handleMouseEnter, handleMouseLeave) => (
                    <button
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      ref={ref}
                      onClick={() => applyFormat("justifyCenter")}
                      className={style.alignBtn}
                    >
                      <AlignTextCenterIcon size={20} />
                    </button>
                  )}
                />

                <ToolTip
                  value="اليسار"
                  component={(ref, handleMouseEnter, handleMouseLeave) => (
                    <button
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      ref={ref}
                      onClick={() => applyFormat("justifyLeft")}
                      className={style.alignBtn}
                    >
                      <AlignTextLeftIcon size={20} />
                    </button>
                  )}
                />
              </Card>
            )}
          />

          <div className={style.dividor}></div>
          <AddLinkBtn />
          <ToolTip
            value="إضافة صور"
            component={(ref, handleMouseEnter, handleMouseLeave) => (
              <button
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                ref={ref}
                onClick={() =>
                  openImgModal("editor", (media) => addImgToEditor(media))
                }
                className={style.btn}
              >
                <ImgIco />
              </button>
            )}
          />

          <AddVideoBtn addVideo={addVideo} />
          <div className={style.dividor}></div>
          <ToolTip
            value="قائمة نقاط"
            component={(ref, handleMouseEnter, handleMouseLeave) => (
              <button
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                ref={ref}
                onClick={() => applyFormat("insertUnorderedList")}
                className={style.btn}
              >
                <ListIcon size={20} />
              </button>
            )}
          />

          <ToolTip
            value="قائمة أرقام"
            component={(ref, handleMouseEnter, handleMouseLeave) => (
              <button
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                ref={ref}
                onClick={() => applyFormat("insertOrderedList")}
                className={style.btn}
              >
                <ListNumIcon size={20} />
              </button>
            )}
          />

          <ToolTip
            value="Redo"
            component={(ref, handleMouseEnter, handleMouseLeave) => (
              <button
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                ref={ref}
                onClick={() => applyFormat("redo")}
                className={style.btn}
              >
                <RedoIco style={{ height: "20px", width: "20px" }} />
              </button>
            )}
          />

          <ToolTip
            value="Undo"
            component={(ref, handleMouseEnter, handleMouseLeave) => (
              <button
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                ref={ref}
                onClick={() => applyFormat("undo")}
                className={style.btn}
              >
                <UndoIco />
              </button>
            )}
          />

          <ToolTip
            value="إزالة التنسيق"
            component={(ref, handleMouseEnter, handleMouseLeave) => (
              <button
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                ref={ref}
                style={{ marginRight: "auto" }}
                onClick={() => applyFormat("removeFormat")}
                className={style.btn}
              >
                <BanIcon size={20} />
              </button>
            )}
          />
        </div>
        <iframe
          ref={editorRef}
          srcDoc={`<!DOCTYPE html>
            <html dir="rtl">
              <head>
                <meta charset="UTF-8" />
                <style>

                * {
                box-sizing: border-box;
                }

                html {
                  height: 100%;
                  display: flex;
                  flex-direction: column;
                  scrollbar-width: thin;

                }
                body{
                  margin: 10px;
                  height: 100%;

                  p{
                  margin:0;
                  margin-bottom: 10px;
                  }
                  iframe, img{
                  width:100%
                  }
                }
                
                </style>
              </head>
              <body contenteditable="true">
              <p>
              <br />
              </p>
              </body>
            </html>
            `}
          className={style.iframe}
        ></iframe>
      </div>
    </>
  );
}

import React, { useEffect, useRef, type ReactNode } from "react";
import style from "@/css/component/modal.module.css";
import Xicon from "@/assets/icons/Xicon";
import Portal from "./Portal";

type Prop = {
  isOpen: boolean;
  backdrop?: boolean;
  delayedClose?: boolean;
  children: ReactNode;
  title: string;
  width?: number;
  heigth?: number;
  openModal?: () => void;
  closeModal: () => void;
  footerRender?: (handleClose: () => void) => ReactNode;
  render?: (handleOpen?: () => void) => ReactNode;
};
export default function Modal({
  isOpen,
  delayedClose = true,
  backdrop = false,
  children,
  title,
  width,
  heigth,
  footerRender,
  openModal,
  closeModal,
  render,
}: Prop) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      closeModal();
    }
  };

  const close = () => {
    modalRef.current?.removeAttribute("open");
    if (delayedClose) setTimeout(closeModal, 100);
    else closeModal();
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.setAttribute("style", "height:100vh;overflow-y:hidden;");
    } else {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.removeAttribute("style");
    }
  }, [isOpen]);

  return (
    <>
      <Portal>
        {backdrop && isOpen && <div className={style.backDrop}></div>}
        {isOpen && (
          <div
            className={style.dialog}
            style={{
              width: `${width}px`,
              height: `${heigth}px`,
            }}
            ref={modalRef}
          >
            <div className={style.header}>
              {title}
              <button
                className={style.close_btn}
                onClick={close}
              >
                <Xicon size={20} />
              </button>
            </div>
            <main>{children}</main>
            {footerRender && <footer> {footerRender(close)}</footer>}
          </div>
        )}
      </Portal>
      {render && render(openModal)}
    </>
  );
}

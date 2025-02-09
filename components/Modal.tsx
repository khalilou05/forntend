import React, { useEffect, useRef, type ReactNode } from "react";
import style from "@/css/component/modal.module.css";
import Xicon from "@/assets/icons/Xicon";

type Prop = {
  isOpen: boolean;
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
  children,
  title,
  width,
  heigth,
  footerRender,
  openModal,
  closeModal,
  render,
}: Prop) {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDialogElement>) => {
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
    if (isOpen && modalRef.current) {
      modalRef.current.showModal();
      document.body.setAttribute("style", "height:100vh;overflow-y:hidden;");
    } else {
      modalRef.current?.close();
      document.body.removeAttribute("style");
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <dialog
          onKeyDown={handleKeyDown}
          className={style.dialog}
          style={{
            width: width,
            height: heigth,
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
        </dialog>
      )}
      {render && render(openModal)}
    </>
  );
}

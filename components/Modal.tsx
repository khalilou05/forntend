import React, { useEffect, useRef, type ReactNode, useState } from "react";
import style from "@/css/component/modal.module.css";
import Xicon from "@/assets/icons/Xicon";

type Prop = {
  outOpen?: boolean;
  children: ReactNode;
  modalTitle: string;
  width?: number;
  setOutClose?: () => void;
  footerRender?: (handleClose: () => void) => ReactNode;

  render?: (handleOpen: () => void) => ReactNode;
};
export default function Modal({
  outOpen = false,
  children,
  modalTitle,

  width = 620,
  footerRender,
  setOutClose,

  render,
}: Prop) {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const [inOpen, setinOpen] = useState(false);

  const openModal = () => {
    setinOpen(true);
    modalRef.current?.setAttribute("open", "");
  };
  const closeModal = () => {
    modalRef.current?.removeAttribute("open");

    setTimeout(() => {
      setinOpen(false);
      setOutClose && setOutClose();
    }, 100);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDialogElement>) => {
    if (e.key === "Escape") {
      setinOpen(false);
      setOutClose && setOutClose();
    }
  };

  useEffect(() => {
    if ((inOpen || outOpen) && modalRef.current) {
      modalRef.current.showModal();

      document.body.setAttribute("style", "height:100vh;overflow-y:hidden;");
    } else {
      modalRef.current?.close();

      document.body.removeAttribute("style");
    }
  }, [outOpen, inOpen]);

  return (
    <>
      {(inOpen || outOpen) && (
        <dialog
          onKeyDown={handleKeyDown}
          className={style.dialog}
          style={{
            width: `${width}px`,
          }}
          ref={modalRef}
        >
          <div className={style.header}>
            {modalTitle}
            <button className={style.close_btn} onClick={closeModal}>
              <Xicon size={20} />
            </button>
          </div>
          <main>{children}</main>
          {footerRender && <footer> {footerRender(closeModal)}</footer>}
        </dialog>
      )}
      {render && render(openModal)}
    </>
  );
}

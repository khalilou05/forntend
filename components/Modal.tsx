import React, { useEffect, useRef, type ReactNode, useState } from "react";
import style from "@/css/component/modal.module.css";
import Xicon from "@/assets/icons/Xicon";

import Button from "@/components/Button";

type Prop = {
  children: ReactNode;
  modalTitle: string;
  submitValue: string;
  submitBtnType?: "primary" | "disabled" | "danger";
  submitBtnDisabled?: boolean;
  height?: number;
  width?: number;

  cancelValue: string;
  onSubmit?: () => void;
  render: (handleClick: () => void) => ReactNode;
};
export default function Modal({
  children,
  modalTitle,
  submitValue,
  submitBtnType = "primary",
  submitBtnDisabled = true,
  cancelValue,
  height = 450,
  width = 620,
  onSubmit,
  render,
}: Prop) {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const togleModal = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <dialog
          style={{ height: `${height}px`, width: `${width}px` }}
          className={style.dialog}
          ref={modalRef}
        >
          <div className={style.header}>
            {modalTitle}
            <button className={style.close_btn} onClick={togleModal}>
              <Xicon size={20} />
            </button>
          </div>
          <main>{children}</main>
          <div className={style.footer}>
            <Button className={style.btn} type="secandary" onClick={togleModal}>
              {cancelValue}
            </Button>

            <Button
              className={style.btn}
              type={submitBtnDisabled ? "disabled" : submitBtnType}
              onClick={onSubmit}
            >
              {submitValue}
            </Button>
          </div>
        </dialog>
      )}
      {render(togleModal)}
    </>
  );
}

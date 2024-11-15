import { useEffect, useRef, useState } from "react";
import style from "@/css/component/searchArticleModal.module.css";
import Xicon from "@/assets/icons/Xicon";
export default function ConfirmModal() {
  const [isOpen, setisOpen] = useState(false);

  const modalRef = useRef<HTMLDialogElement | null>(null);

  const togleModal = () => {
    setisOpen(!isOpen);
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
          className={style.dialog}
          ref={modalRef}
        >
          <div className={style.header}>
            إختيار المنتجات
            <button
              className={style.close_btn}
              onClick={togleModal}
            >
              <Xicon size={20} />
            </button>
          </div>
          <main></main>
          <div className={style.footer}>
            <button
              onClick={togleModal}
              className={style.cancel_btn}
            >
              <span>إلغاء</span>
            </button>
            <button className={style.add_btn}>
              <span>إضاقة</span>
            </button>
          </div>
        </dialog>
      )}
    </>
  );
}

import React, { useEffect, useRef, useState } from "react";
import style from "@/css/component/searchArticleModal.module.css";
import Xicon from "@/assets/icons/Xicon";
import SearchInput from "../SearchInput";
import Button from "@/components/Button";
type Prop = {
  value: string;
  isOpen: boolean;
  closeModal: () => void;
  openModal: () => void;
};
export default function SearchArticleModal({
  value,
  isOpen,
  closeModal,
  openModal,
}: Prop) {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const [query, setquery] = useState("");
  const [selectedProduct, setselectedProduct] = useState([]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setquery(e.target.value);
  };

  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.showModal();
      const input = document.getElementById("search") as HTMLInputElement;
      input?.focus();
    } else {
      modalRef.current?.close();
    }
  }, [isOpen]);

  useEffect(() => {
    setquery(value);
  }, [value]);

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
              onClick={closeModal}
            >
              <Xicon size={20} />
            </button>
          </div>
          <main>
            <div className={style.search_bar}>
              <SearchInput
                id="search"
                value={query}
                onChange={onChange}
                placeholder="إبحث عن منتجات"
              />
            </div>
          </main>
          <div className={style.footer}>
            <Button
              className={style.btn}
              type="secandary"
              onClick={closeModal}
            >
              إلغاء
            </Button>

            <Button
              className={style.btn}
              disabled={!!selectedProduct.length}
              type={!!selectedProduct.length ? "primary" : "disabled"}
            >
              إضافة
            </Button>
          </div>
        </dialog>
      )}
      <Button
        type="secandary"
        onClick={openModal}
      >
        عرض
      </Button>
    </>
  );
}

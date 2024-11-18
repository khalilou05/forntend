import React, { useEffect, useRef, useState } from "react";
import style from "@/css/component/searchArticleModal.module.css";
import Xicon from "@/assets/icons/Xicon";
import SearchInput from "../SearchInput";
import Button from "@/components/Button";
import { fetchApi } from "@/api/fetchApi";
import type { Product } from "@/types/types";
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
  const [product, setProduct] = useState<Product[]>([]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setquery(e.target.value);
  };

  const getProduct = async () => {
    const params = new URLSearchParams(`product_name=${query}`);
    const response = await fetchApi<Product[]>(`/product?${params}`);
    if (response?.data) setProduct(response.data);
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
    if (query === "") return;
    const timerId = setTimeout(() => {
      getProduct();
    }, 200);

    return () => clearTimeout(timerId);
  }, [query]);
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
            {product.map((item) => (
              <div key={item.id}>
                <span>{item.title}</span>
                <span>{item.price}</span>
              </div>
            ))}
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

type ProductListProp = {
  product: Product;
};

export function ProductList({ product }: ProductListProp) {
  return (
    <div>
      <input type="checkbox" />
      <span>{product.title}</span>
      {product.option.map((option) => (
        <div>
          <input type="checkbox" />
          <span>{}</span>
        </div>
      ))}
    </div>
  );
}

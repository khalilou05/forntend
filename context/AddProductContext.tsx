"use client";
import type { Media, Product, ProductOption } from "@/types/types";
import React, { createContext, useContext, useRef, useState } from "react";

export type AddPrdCtx = {
  mediaList: Media[];
  productOption: ProductOption[];
  setProductOption: React.Dispatch<React.SetStateAction<ProductOption[]>>;

  setMediaList: React.Dispatch<React.SetStateAction<Media[]>>;
  handleProductUpdate: <T extends keyof Product>(
    prop: T,
    value: Product[T]
  ) => void;
};

export const Context = createContext<AddPrdCtx | null>(null);

export default function PageCtx({ children }: { children: React.ReactNode }) {
  const [mediaList, setMediaList] = useState<Media[]>([]);
  const [productOption, setProductOption] = useState<ProductOption[]>([]);
  const product = useRef<Product>({
    title: "",
    price: 0,
    prev_price: 0,
    buying_price: 0,
    global_stock: 0,
    category_id: 0,
    description: "",
    out_stock_sell: false,
    free_shipping: false,
    active: true,
    has_option: false,
  });
  const handleProductUpdate = <T extends keyof Product>(
    prop: T,
    value: Product[T]
  ) => {
    product.current[prop] = value;
  };

  return (
    <Context
      value={{
        mediaList,
        productOption,
        setProductOption,
        setMediaList,
        handleProductUpdate,
      }}
    >
      {children}
    </Context>
  );
}

export function useAddPrdCtx() {
  const AddprdCtx = useContext(Context);
  if (!AddprdCtx) {
    throw new Error("ctx is null");
  }
  return AddprdCtx;
}

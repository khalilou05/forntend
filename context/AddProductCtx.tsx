"use client";
import fetchApi from "@/lib/fetch";
import type { Media, Product, ProductOption, Variant } from "@/types/types";

import React, {
  createContext,
  use,
  useCallback,
  useRef,
  useState,
} from "react";

export type AddPrdCtx = {
  productOption: ProductOption[];
  productMedia: Media[];
  setProductOption: React.Dispatch<React.SetStateAction<ProductOption[]>>;
  setproductMedia: React.Dispatch<React.SetStateAction<Media[]>>;
  handleProductUpdate: <T extends keyof Product>(
    prop: T,
    value: Product[T]
  ) => void;
};

export const Context = createContext<AddPrdCtx | null>(null);

export default function PageCtx({ children }: { children: React.ReactNode }) {
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
  const [productOption, setProductOption] = useState<ProductOption[]>([]);
  const [variants, setVariants] = useState<Variant[]>([]);
  const [productMedia, setproductMedia] = useState<Media[]>([]);

  const handleProductUpdate = useCallback(
    <T extends keyof Product>(prop: T, value: Product[T]) => {
      product.current[prop] = value;
    },
    []
  );

  const handleOptionUpdate = () => {};

  const submitProduct = async () => {
    const data = {
      id: crypto.randomUUID(),
      ...product,
      options: productOption,
      variants: variants,
    };
    const resp = await fetchApi("/product", {
      method: "POST",
      body: JSON.stringify(data),
    });
  };

  return (
    <Context
      value={{
        productOption,
        productMedia,
        setproductMedia,
        setProductOption,
        handleProductUpdate,
      }}
    >
      {children}
    </Context>
  );
}

export function useAddPrdCtx() {
  const AddprdCtx = use(Context);
  if (!AddprdCtx) {
    throw new Error("ctx is null");
  }
  return AddprdCtx;
}

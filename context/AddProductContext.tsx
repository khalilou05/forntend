import type { Media, Product, ProductOption } from "@/types/types";
import React, {
  createContext,
  useRef,
  useState,
  type ChangeEvent,
} from "react";

export type AddPrdCtx = {
  mediaList: Media[];
  productOption: ProductOption[];

  setMediaList: React.Dispatch<React.SetStateAction<Media[]>>;
  handleProductUpdate: <T extends keyof Product>(
    prop: T,
    value: Product[T]
  ) => void;
};

export const Context = createContext<AddPrdCtx>({} as AddPrdCtx);

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
        setMediaList,
        handleProductUpdate,
      }}
    >
      {children}
    </Context>
  );
}

export type ImgModlaType = {
  openImgModal: (
    openfor: "product" | "editor" | "variant",
    callback: (media: Media[]) => void
  ) => void;
  handleImgUpload: (
    e: ChangeEvent<HTMLInputElement>,
    callBack: (media: Media[]) => void
  ) => Promise<void>;
};

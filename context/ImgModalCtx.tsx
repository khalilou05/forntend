"use client";

import ImageModal from "@/components/ImageModal";
import type { Media } from "@/types/types";
import { createContext, type RefObject, use, useRef, useState } from "react";

export type ImgModlaCtxType = {
  openImgModal: (
    openfor: "product" | "editor" | "variant",
    callback: (media: Media[]) => void
  ) => void;

  closeModal: () => void;
  imgModalcallBack: RefObject<((media: Media[]) => void) | null>;

  isOpen: boolean;
};

export const ImgModlaCtx = createContext<ImgModlaCtxType | null>(null);

export function ImgModlProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [openFor, setOpenFor] = useState<"product" | "editor" | "variant">(
    "product"
  );

  const imgModalcallBack = useRef<((media: Media[]) => void) | null>(null);

  const closeModal = () => setIsOpen(false);

  const openImgModal = (
    openfor: typeof openFor,
    callback: (media: Media[]) => void
  ) => {
    setIsOpen(true);
    setOpenFor(openfor);
    imgModalcallBack.current = callback;
  };
  return (
    <ImgModlaCtx
      value={{
        openImgModal,
        closeModal,
        imgModalcallBack,
        isOpen,
      }}
    >
      {children}
      <ImageModal />
    </ImgModlaCtx>
  );
}

export function useImgModalCtx() {
  const ImgModalCtx = use(ImgModlaCtx);
  if (!ImgModalCtx) throw new Error("image modal ctx is null");
  return ImgModalCtx;
}

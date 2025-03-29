"use client";

import ImageModal from "@/components/ImageModal";
import fetchApi from "@/lib/fetch";
import type { Media } from "@/types/types";
import {
  type ChangeEvent,
  createContext,
  useContext,
  useRef,
  useState,
} from "react";

import { useAddPrdCtx } from "./AddProductContext";

export type ImgModlaCtxType = {
  openImgModal: (
    openfor: "product" | "editor" | "variant",
    callback: (media: Media[]) => void
  ) => void;
  handleImgUpload: (
    e: ChangeEvent<HTMLInputElement>,
    callBack: (media: Media[]) => void
  ) => Promise<void>;
};

export const ImgModlaCtx = createContext<ImgModlaCtxType | null>(null);

export function ImgModlProvider({ children }: { children: React.ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openFor, setOpenFor] = useState<"product" | "editor" | "variant">(
    "product"
  );

  const imgModalcallBack = useRef<((media: Media[]) => void) | null>(null);

  const { mediaList } = useAddPrdCtx();

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleImgUpload = async (
    e: ChangeEvent<HTMLInputElement>,
    callBack: (media: Media[]) => void
  ) => {
    if (!e.target.files) return;
    const files = [...e.target.files];
    const formData = new FormData();
    for (const file of files) {
      formData.append("media", file);
    }
    const { data } = await fetchApi<Media[]>("/media", {
      method: "POST",
      body: formData,
    });
    if (data) callBack(data);
  };

  const openImgModal = (
    openfor: typeof openFor,
    callback: (media: Media[]) => void
  ) => {
    setIsModalOpen(true);
    setOpenFor(openfor);
    imgModalcallBack.current = callback;
  };
  return (
    <ImgModlaCtx value={{ openImgModal, handleImgUpload }}>
      {children}
      <ImageModal
        mediaList={mediaList}
        handleImgUpload={handleImgUpload}
        openFor={openFor}
        callBack={imgModalcallBack.current}
        closeModal={closeModal}
        isOpen={isModalOpen}
      />
    </ImgModlaCtx>
  );
}

export function useImgModalCtx() {
  const ImgModalCtx = useContext(ImgModlaCtx);
  if (!ImgModalCtx) throw new Error("image modal ctx is null");
  return ImgModalCtx;
}

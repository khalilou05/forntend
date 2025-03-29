"use client";
import style from "@/css/component/imageModal.module.css";
import useFetch from "@/hooks/useFetch";
import fetchApi from "@/lib/fetch";
import { FILE_SERVER } from "@/settings";
import type { Media } from "@/types/types";
import React, { useMemo, useRef, useState } from "react";
import Button from "./Button";
import CheckBox from "./CheckBox";
import DropDown from "./DropDown";
import ErrorMsg from "./ErrorMsg";
import Input from "./Input";
import Modal from "./Modal";
import { SquareSkeleteon } from "./Skeleteon";

export type ImageModalProp = {
  openFor: "product" | "editor" | "variant";
  mediaList: Media[];
  isOpen: boolean;
  closeModal: () => void;
  callBack: ((images: Media[]) => void) | null;
  handleImgUpload: (
    event: React.ChangeEvent<HTMLInputElement>,
    callBack: (media: Media[]) => void
  ) => void;
};

export default function ImageModal({
  mediaList,
  openFor,
  isOpen,
  closeModal,
  callBack,
  handleImgUpload,
}: ImageModalProp) {
  const [selectedImg, setSelectedImg] = useState<Media[]>([]);

  const [searchValue, setSearchValue] = useState("");
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const cache = useRef<Media[]>([]);

  const {
    data: medias,
    setData,
    loading,
    error,
  } = useFetch<Media[]>("/media", true, undefined);

  const inSelection = (id: string) => {
    const inSelectedImage = selectedImg.find((img) => img.id === id);
    if (inSelectedImage) return true;
    return false;
  };

  const handleSelectImage = (media: Media) => {
    setSelectedImg((prv) => {
      const inPrvSelection = prv.find((img) => img.id === media.id);
      if (inPrvSelection) return prv.filter((itm) => itm.id !== media.id);
      return [...prv, media];
    });
  };

  const handleDeleteImage = async () => {
    const { status } = await fetchApi("/media", {
      method: "DELETE",
      body: JSON.stringify(selectedImg),
    });
    if (status === 200) {
      const imgId = selectedImg.map((item) => item.id);
      const filtredMedia = medias?.filter((itm) => !imgId.includes(itm.id));
      setData(filtredMedia || []);
      setSelectedImg([]);
    }
  };

  const searchResult = useMemo(() => {
    return medias?.filter((item) => item.file_name.includes(searchValue));
  }, [searchValue]);

  useMemo(() => {
    if (openFor === "product") {
      setSelectedImg(mediaList);
      cache.current = mediaList;
    } else {
      setSelectedImg([]);
      cache.current = [];
    }
  }, [mediaList, isOpen]);

  return (
    <>
      <Modal
        backdrop
        animatedColse={false}
        isOpen={isOpen}
        closeModal={closeModal}
        style={{
          height: "600px",
          width: "800px",
        }}
        title="إختيار صور"
        footerRender={(handleClose) => (
          <>
            {selectedImg.length ? (
              <Button
                style={{ marginLeft: "auto" }}
                onClick={() => setSelectedImg([])}
                buttonType="link"
              >
                إلغاء التحديد
              </Button>
            ) : null}
            <Button
              onClick={handleClose}
              buttonType="secandary"
            >
              إلغاء
            </Button>
            <Button
              onClick={() => {
                callBack?.(selectedImg);
                handleClose();
              }}
              buttonType={"primary"}
            >
              إضافة
            </Button>
          </>
        )}
      >
        <div className={style.add_sec_warp}>
          <div className={style.add_sec}>
            <DropDown
              align="right"
              renderChildren={() => (
                <>
                  <Input />
                </>
              )}
              component={(isOpen, ref, _, togleDropDow) => (
                <Button
                  onClick={togleDropDow}
                  ref={ref}
                  buttonType="link"
                >
                  إضافة برابط
                </Button>
              )}
            />
            <Button
              onClick={() => inputFileRef.current?.click()}
              buttonType="secandary"
            >
              رفع صور جديدة
            </Button>
            <input
              onChange={(e) =>
                handleImgUpload(e, (media) =>
                  setData((prv) => {
                    if (prv) return [...media, ...prv];
                    return [...media];
                  })
                )
              }
              ref={inputFileRef}
              type="file"
              multiple
              hidden
            />
          </div>
        </div>
        {error && <ErrorMsg msg={error} />}
        <div className={style.content}>
          {medias?.map((media) => (
            <Media
              media={media}
              inSelection={inSelection}
              handleSelectImage={handleSelectImage}
              key={media.id}
            />
          ))}
        </div>
      </Modal>
    </>
  );
}

type MediaProp = {
  media: Media;
  handleSelectImage: (media: Media) => void;
  inSelection: (id: string) => boolean;
};

function Media({ media, handleSelectImage, inSelection }: MediaProp) {
  const [isLoading, setisLoading] = useState(true);

  return (
    <div
      onClick={(e) => {
        console.log(e.currentTarget);
        handleSelectImage(media);
      }}
      className={style.media_item}
    >
      <CheckBox
        className={style.checkBox}
        checked={inSelection(media.id)}
        style={{ visibility: isLoading ? "hidden" : "visible" }}
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => {
          e.stopPropagation();
          console.log(e.currentTarget);

          handleSelectImage(media);
        }}
      />
      {isLoading && <SquareSkeleteon width={150} />}
      {media.type === "image" ? (
        <img
          loading="lazy"
          onLoad={() => setisLoading(false)}
          style={{ pointerEvents: "none", userSelect: "none" }}
          width={150}
          height={150}
          src={`${FILE_SERVER}${media.url}`}
          alt="img"
        />
      ) : (
        <video
          onClick={(e) => e.preventDefault()}
          controls
          height={150}
          width={150}
          src={media.url}
        ></video>
      )}
    </div>
  );
}

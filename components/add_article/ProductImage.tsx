import React, { useEffect, useMemo, useRef, useState } from "react";
import style from "@/css/component/imageManager.module.css";

import PlusIcon from "@/assets/icons/plus";
import DragableMedia from "./DragableMedia";
import { type Media } from "@/types/types";

import fetchApi from "@/lib/fetch";
import Button from "../Button";
import CheckBox from "../CheckBox";
type Prop = {
  mediaList: Media[];
  setMediaList: React.Dispatch<React.SetStateAction<Media[]>>;
  openForProductImg: () => void;
};

export default function ProductImage({
  mediaList,
  setMediaList,
  openForProductImg,
}: Prop) {
  const [selectedImage, setselectedImage] = useState<string[]>([]);
  const [dragMode, setdragMode] = useState(false);
  const [expand, setexpand] = useState(false);
  const InputRef = useRef<HTMLInputElement | null>(null);
  const slectAllRef = useRef<HTMLInputElement | null>(null);
  const mediaToRender = [];
  const handleSelectAllImage = () => {
    if (selectedImage.length === mediaList.length) {
      setselectedImage([]);
    } else {
      const imgId = mediaList.map((item) => item.id);
      setselectedImage(imgId);
    }
  };

  const handleSelectImage = (id: string) => {
    const inSelection = selectedImage.includes(id);
    if (inSelection) {
      const newImage = selectedImage.filter((item) => item !== id);
      setselectedImage(newImage);
    } else {
      setselectedImage((prv) => [...prv, id]);
    }
  };
  const inSelectedImage = (id: string) => {
    return selectedImage.includes(id);
  };
  const deleteSelectedImage = () => {
    const newImages = mediaList.filter(
      (item) => !selectedImage.includes(item.id)
    );
    setMediaList(newImages);
    setselectedImage([]);
  };

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    const formData = new FormData();
    for (const file of files) {
      formData.append("medias", file);
    }
    const { data, status } = await fetchApi<Media[]>("/media", {
      method: "POST",
      body: formData,
    });

    if (data) setMediaList((prv) => [...prv, ...data]);
  };

  for (let i = 0; i < mediaList.length; i++) {
    mediaToRender.push(
      <DragableMedia
        selectedImageLength={selectedImage.length}
        dragMode={dragMode}
        setdragMode={setdragMode}
        setSelectedImage={() => handleSelectImage(mediaList[i].id)}
        inSelectedImage={inSelectedImage(mediaList[i].id)}
        fileListLength={mediaList.length}
        imageID={mediaList[i].id}
        key={mediaList[i].id}
        media={mediaList[i]}
      />
    );

    if (i == 6 && !expand && mediaList.length > 8) {
      mediaToRender.push(
        <div
          key={i}
          className={style.expand_btn}
          onClick={() => setexpand(true)}
        >
          <img
            src={mediaList[7].url}
            alt=""
          />
          <span>{mediaList.length - 7}+</span>
        </div>
      );

      break;
    }
  }

  useEffect(() => {
    if (!slectAllRef.current) return;
    if (selectedImage.length === mediaList.length) {
      slectAllRef.current.checked = true;
      slectAllRef.current.indeterminate = false;
    } else {
      slectAllRef.current.indeterminate = true;
      slectAllRef.current.checked = false;
    }
  }, [selectedImage]);

  return (
    <>
      {!selectedImage.length ? (
        <label className={style.image_title}>الصور</label>
      ) : (
        <div className={style.select_bar}>
          <div>
            <CheckBox
              style={{ cursor: "pointer" }}
              onChange={handleSelectAllImage}
              ref={slectAllRef}
            />

            <span>{selectedImage.length} صور محددة</span>
          </div>
          <Button
            onClick={deleteSelectedImage}
            buttonType="link"
            className={style.delete_btn}
          >
            حذف
          </Button>
        </div>
      )}
      <section
        onClick={() => {
          if (mediaList.length) return;
          InputRef.current?.click();
        }}
        className={mediaList.length ? style.warper : style.warper_no_content}
      >
        {mediaList.length ? (
          <>
            {mediaToRender}
            <button
              onClick={(e) => {
                e.stopPropagation();
                openForProductImg();
              }}
            >
              <PlusIcon size={"20px"} />
            </button>
            <input
              onChange={handleUploadImage}
              accept=".jpeg,.webp,.png,.jpg,.avif,.svg"
              ref={InputRef}
              hidden
              multiple
              type="file"
            />
          </>
        ) : (
          <>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                openForProductImg();
              }}
              buttonType="link"
            >
              إختيار صور
            </Button>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                InputRef.current?.click();
              }}
              buttonType="secandary"
            >
              رفع صور جديدة
            </Button>
            <input
              onChange={handleUploadImage}
              accept=".jpeg,.webp,.png,.jpg,.avif,.svg"
              ref={InputRef}
              hidden
              type="file"
              multiple
            />
          </>
        )}
      </section>
    </>
  );
}

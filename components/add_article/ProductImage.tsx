import React, { useEffect, useMemo, useRef, useState } from "react";
import style from "@/css/component/imageManager.module.css";

import PlusIcon from "@/assets/icons/plus";
import DragableImage from "./Dragableimage";
import { Images, type ImagesIn } from "@/types/types";
import Image from "next/image";

import fetchApi from "@/lib/fetch";
import Button from "../Button";
type Prop = {
  mediaList: ImagesIn[];
  setMediaList: React.Dispatch<React.SetStateAction<ImagesIn[]>>;
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
    const { data, status } = await fetchApi<ImagesIn[]>("/media", {
      method: "POST",
      body: formData,
    });

    if (data) setMediaList((prv) => [...prv, ...data]);
  };

  for (let i = 0; i < mediaList.length; i++) {
    mediaToRender.push(
      <DragableImage
        selectedImageLength={selectedImage.length}
        dragMode={dragMode}
        setdragMode={setdragMode}
        setSelectedImage={() => handleSelectImage(mediaList[i].id)}
        inSelectedImage={inSelectedImage(mediaList[i].id)}
        fileListLength={mediaList.length}
        imageID={mediaList[i].id}
        key={mediaList[i].id}
        imgUrl={mediaList[i].url}
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
    if (selectedImage.length) {
      slectAllRef.current.indeterminate = true;
      slectAllRef.current.checked = false;
    }
    if (selectedImage.length === mediaList.length) {
      slectAllRef.current.checked = true;
      slectAllRef.current.indeterminate = false;
    }
    if (selectedImage.length === 0) {
      slectAllRef.current.indeterminate = false;
      slectAllRef.current.checked = false;
    }
  }, [selectedImage.length]);

  return (
    <>
      {!selectedImage.length ? (
        <label className={style.image_title}>الصور</label>
      ) : (
        <div className={style.select_bar}>
          <div>
            <input
              ref={slectAllRef}
              type="checkbox"
              onChange={handleSelectAllImage}
            />
            <span>{selectedImage.length} صور محددة</span>
          </div>

          <button onClick={deleteSelectedImage}>حذف</button>
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
              accept=".jpeg,.webp,.png,.jpg,.avif"
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
              رفع صور
            </Button>
            <input
              onChange={handleUploadImage}
              accept=".jpeg,.webp,.png,.jpg,.avif"
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

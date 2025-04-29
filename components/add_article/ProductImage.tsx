"use client";

import style from "@/css/imageManager.module.css";
import { useEffect, useRef, useState } from "react";

import PlusIcon from "@/assets/icons/plus";
import DragableMedia from "./DragableMedia";

import { useAddPrdCtx } from "@/context/AddProductCtx";
import { useImgModalCtx } from "@/context/ImgModalCtx";
import Button from "../Button";
import CheckBox from "../CheckBox";

export default function ProductImage() {
  const [selectedImage, setselectedImage] = useState<string[]>([]);
  const [dragMode, setdragMode] = useState(false);
  const [expand, setexpand] = useState(false);
  const InputRef = useRef<HTMLInputElement | null>(null);
  const slectAllRef = useRef<HTMLInputElement | null>(null);
  const { productMedia, setproductMedia } = useAddPrdCtx();
  const { openImgModal } = useImgModalCtx();
  const mediaToRender = [];
  const handleSelectAllImage = () => {
    if (selectedImage.length === productMedia.length) {
      setselectedImage([]);
    } else {
      const imgId = productMedia.map((item) => item.id);
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
    // const newImages = productMedia.filter(
    //   (item) => !selectedImage.includes(item.id)
    // );
    // setproductMedia(newImages);
    setselectedImage([]);
  };

  for (let i = 0; i < productMedia.length; i++) {
    mediaToRender.push(
      <DragableMedia
        selectedImageLength={selectedImage.length}
        dragMode={dragMode}
        setdragMode={setdragMode}
        setSelectedImage={() => handleSelectImage(productMedia[i].id)}
        inSelectedImage={inSelectedImage(productMedia[i].id)}
        fileListLength={productMedia.length}
        imageID={productMedia[i].id}
        key={productMedia[i].id}
        media={productMedia[i]}
      />
    );

    if (i == 6 && !expand && productMedia.length > 8) {
      mediaToRender.push(
        <div
          key={i}
          className={style.expand_btn}
          onClick={() => setexpand(true)}
        >
          <img
            src={productMedia[7].url}
            alt=""
          />
          <span>{productMedia.length - 7}+</span>
        </div>
      );

      break;
    }
  }

  useEffect(() => {
    if (!slectAllRef.current) return;
    if (selectedImage.length === productMedia.length) {
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
          if (productMedia.length) return;
          InputRef.current?.click();
        }}
        className={productMedia.length ? style.warper : style.warper_no_content}
      >
        {productMedia.length ? (
          <>
            {mediaToRender}
            <button
              onClick={() => {
                openImgModal("product", (media) => setproductMedia(media));
              }}
            >
              <PlusIcon size={20} />
            </button>
            <input
              onChange={
                (event) => null
                // handleImgUpload(event, (media) => setproductMedia(media))
              }
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
                openImgModal("product", (media) => setproductMedia(media));
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
              onChange={
                (event) => null
                // handleImgUpload(event, (data) =>
                // setproductMedia([...productMedia, ...data])
                // )
              }
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

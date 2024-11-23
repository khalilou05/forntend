import React, { useEffect, useMemo, useRef, useState } from "react";
import style from "@/css/component/imageManager.module.css";

import AddImageIcon from "@/assets/icons/addImage";
import PlusIcon from "@/assets/icons/plus";
import DragableImage from "./Dragableimage";
import { ImagesPosition, Images } from "@/types/types";

type Prop = {
  imageFileList: Images[];
  setimageFileList: React.Dispatch<React.SetStateAction<Images[]>>;
};

export default function AdminImageSlider({
  imageFileList,
  setimageFileList,
}: Prop) {
  const [selectedImage, setselectedImage] = useState<string[]>([]);
  const [dragedIndex, setdragedIndex] = useState<string | null>(null);
  const [imagePosition, setimagePosition] = useState<ImagesPosition[]>([]);
  const [dragMode, setdragMode] = useState(false);
  const [expand, setexpand] = useState(false);
  const InputRef = useRef<HTMLInputElement | null>(null);
  const slectAllRef = useRef<HTMLInputElement | null>(null);
  let imageList2 = [];
  const imageUrlList = useMemo(
    () =>
      imageFileList?.map((item) => {
        return {
          id: item.id,
          image: URL.createObjectURL(item.image),
        };
      }),
    [imageFileList.length],
  );

  const handleSelectAllImage = () => {
    if (selectedImage.length === imageUrlList.length) {
      setselectedImage([]);
    } else {
      const imgId = imageUrlList.map((item) => item.id);
      setselectedImage(imgId);
    }
  };

  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const images = Array.from(e.target.files);
    const data = images.map((item) => {
      return {
        id: self.crypto.randomUUID(),
        image: item,
      };
    });

    setimageFileList((prv) => [...prv, ...data]);
    e.target.value = "";
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
    const newImages = imageFileList.filter(
      (item) => !selectedImage.includes(item.id),
    );
    setimageFileList(newImages);
    setselectedImage([]);
  };

  for (let i = 0; i < imageUrlList.length; i++) {
    imageList2.push(
      <DragableImage
        selectedImageLength={selectedImage.length}
        dragMode={dragMode}
        setdragMode={setdragMode}
        setSelectedImage={() => handleSelectImage(imageUrlList[i].id)}
        inSelectedImage={inSelectedImage(imageUrlList[i].id)}
        setimagePosition={setimagePosition}
        fileListLength={imageFileList.length}
        imageID={imageUrlList[i].id}
        key={imageUrlList[i].id}
        imgUrl={imageUrlList[i].image}
      />,
    );

    if (i == 6 && !expand && imageUrlList.length > 8) {
      imageList2.push(
        <div
          key={i}
          className={style.expand_btn}
          onClick={() => setexpand(true)}
        >
          {imageUrlList.length - 7}+
        </div>,
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
    if (selectedImage.length === imageFileList.length) {
      slectAllRef.current.checked = true;
      slectAllRef.current.indeterminate = false;
    }
    if (selectedImage.length === 0) {
      slectAllRef.current.indeterminate = false;
      slectAllRef.current.checked = false;
    }
  }, [selectedImage.length]);
  useEffect(() => {
    return () => {
      imageUrlList.forEach((item) => URL.revokeObjectURL(item.image));
    };
  }, [imageFileList.length]);

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
          if (imageFileList.length) return;
          InputRef.current?.click();
        }}
        className={
          imageFileList.length ? style.warper : style.warper_no_content
        }
      >
        {imageFileList.length ? (
          <>
            {imageList2}
            <button onClick={() => InputRef.current?.click()}>
              <PlusIcon size={"20px"} />
            </button>
            <input
              accept=".jpeg,.webp,.png,.jpg,.avif"
              ref={InputRef}
              hidden
              multiple
              onChange={handleAddImage}
              type="file"
              id="file2"
            />
          </>
        ) : (
          <>
            <AddImageIcon size={"20px"} />
            <span>إضافة صور</span>
            <input
              accept=".jpeg,.webp,.png,.jpg,.avif"
              ref={InputRef}
              hidden
              onChange={handleAddImage}
              id="images"
              type="file"
              multiple
            />
          </>
        )}
      </section>
    </>
  );
}

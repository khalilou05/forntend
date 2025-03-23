import style from "@/css/component/imageManager.module.css";
import { useContext, useEffect, useRef, useState } from "react";

import PlusIcon from "@/assets/icons/plus";
import DragableMedia from "./DragableMedia";

import { Context } from "@/context/AddProductContext";
import { ImgModlaCtx } from "@/context/ImgModalContext";
import Button from "../Button";
import CheckBox from "../CheckBox";

export default function ProductImage() {
  const [selectedImage, setselectedImage] = useState<string[]>([]);
  const [dragMode, setdragMode] = useState(false);
  const [expand, setexpand] = useState(false);
  const InputRef = useRef<HTMLInputElement | null>(null);
  const slectAllRef = useRef<HTMLInputElement | null>(null);
  const { mediaList, setMediaList } = useContext(Context);
  const { openImgModal, handleImgUpload } = useContext(ImgModlaCtx);
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
              onClick={() => {
                openImgModal("product", (media) => setMediaList(media));
              }}
            >
              <PlusIcon size={20} />
            </button>
            <input
              onChange={(event) =>
                handleImgUpload(event, (media) => setMediaList(media))
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
                openImgModal("product", (media) => setMediaList(media));
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
              onChange={(event) =>
                handleImgUpload(event, (data) =>
                  setMediaList([...mediaList, ...data])
                )
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

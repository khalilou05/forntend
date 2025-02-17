import Modal from "./Modal";
import SearchInput from "./SearchInput";
import Button from "./Button";
import React, { useEffect, useMemo, useRef, useState } from "react";
import useFetch from "@/hooks/useFetch";
import type { ImageModalProp, Media } from "@/types/types";
import style from "@/css/component/imageModal.module.css";
import CheckBox from "./CheckBox";
import LoadingSpiner from "./LoadingSpiner";
import fetchApi from "@/lib/fetch";
import DropDown from "./DropDown";
import Input from "./Input";
export default function ImageModal({
  callBack,
  closeModal,
  mediaList,
  selectionMode,
  isOpen,
}: ImageModalProp) {
  const [selectedImg, setSelectedImg] = useState<Media[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const {
    data: medias,
    setData,
    loading,
  } = useFetch<Media[]>(
    "/media",
    {
      cache: "no-store",
    },
    undefined,
    [mediaList]
  );

  const cache = useRef<Media[]>([]);

  const inSelection = (id: string) => {
    const inSelectedImage = selectedImg.find((img) => img.id === id);
    if (inSelectedImage) return true;
    return false;
  };

  const handleSelectImage = (media: Media) => {
    console.log("handleSelectImage run");

    setSelectedImg((prv) => {
      const inPrvSelection = prv.find((img) => img.id === media.id);
      if (inPrvSelection) return prv.filter((itm) => itm.id !== media.id);
      else return selectionMode === "multiple" ? [...prv, media] : [media];
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
    setSelectedImg(mediaList);
    cache.current = mediaList;
  }, [mediaList, isOpen]);

  return (
    <Modal
      backdrop={true}
      delayedClose={false}
      isOpen={isOpen}
      closeModal={closeModal}
      width={980}
      heigth={600}
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
              callBack && callBack(selectedImg);
              handleClose();
            }}
            buttonType={"primary"}
          >
            إضافة
          </Button>
        </>
      )}
    >
      <div className={style.search_bar}>
        <SearchInput placeholder="إبحث عن إسم الملف" />
      </div>

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
            ref={inputFileRef}
            type="file"
            hidden
          />
        </div>
      </div>

      <div className={style.content}>
        {loading ? (
          <LoadingSpiner size={20} />
        ) : (
          medias?.map((media) => (
            <Media
              media={media}
              inSelection={inSelection}
              handleSelectImage={handleSelectImage}
              key={media.id}
            />
          ))
        )}
      </div>
    </Modal>
  );
}

type MediaProp = {
  media: Media;
  handleSelectImage: (media: Media) => void;
  inSelection: (id: string) => boolean;
};

function Media({ media, handleSelectImage, inSelection }: MediaProp) {
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
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => {
          e.stopPropagation();
          console.log(e.currentTarget);

          handleSelectImage(media);
        }}
      />
      {media.type === "image" ? (
        <img
          loading="lazy"
          style={{ pointerEvents: "none" }}
          width={150}
          height={150}
          src={media.url}
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

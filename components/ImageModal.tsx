import Modal from "./Modal";
import SearchInput from "./SearchInput";
import Button from "./Button";
import { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import type { ImagesIn } from "@/types/types";

type Prop = {
  action: ((images: ImagesIn[]) => void) | null;
  closeModal: () => void;
  openFor: ImagesIn[] | null;
  singleSelectionMode: boolean;
  isOpen: boolean;
};

export default function ImageModal({
  action,
  closeModal,
  openFor,
  singleSelectionMode,
  isOpen,
}: Prop) {
  const [selectedImg, setSelectedImg] = useState<ImagesIn[]>([]);
  const { data: medias } = useFetch<ImagesIn[]>("/media", {
    cache: "no-store",
  });

  const inSelection = (id: string) => {
    const inSelectedImage = selectedImg.find((img) => img.id === id);
    if (inSelectedImage) return true;
    else return false;
  };

  const handleSelectImage = (id: string) => {
    const inSelectedImage = inSelection(id);
    if (inSelectedImage) {
      setSelectedImg((prv) => prv.filter((img) => img.id !== id));
    } else {
      const img = medias?.find((item) => item.id === id);
      if (img && singleSelectionMode) setSelectedImg([img]);
      if (img && !singleSelectionMode) setSelectedImg((prv) => [...prv, img]);
    }
  };

  useEffect(() => {
    if (isOpen) setSelectedImg(openFor || []);
    else setSelectedImg([]);
  }, [isOpen]);

  return (
    <Modal
      delayedClose={false}
      isOpen={isOpen}
      closeModal={closeModal}
      width={980}
      heigth={600}
      title="إختيار صور"
      footerRender={(handleClose) => (
        <>
          <Button
            onClick={handleClose}
            buttonType="secandary"
          >
            إلغاء
          </Button>
          <Button
            onClick={() => {
              action && action(selectedImg);
              handleClose();
            }}
            buttonType={"primary"}
          >
            إضافة
          </Button>
        </>
      )}
    >
      <div>
        <SearchInput placeholder="إبحث عن إسم الملف" />
      </div>
      <div></div>
      <div>
        {medias?.map((media) => (
          <Media
            {...media}
            inSelection={inSelection}
            handleSelectImage={handleSelectImage}
            key={media.id}
          />
        ))}
      </div>
    </Modal>
  );
}

type MediaProp = {
  handleSelectImage: (id: string) => void;
  inSelection: (id: string) => boolean;
};

function Media({
  file_extenstion,
  file_name,
  id,
  type,
  url,
  handleSelectImage,
  inSelection,
}: ImagesIn & MediaProp) {
  const isChecked = inSelection(id);
  return (
    <div>
      <input
        checked={isChecked}
        onChange={() => handleSelectImage(id)}
        type="checkbox"
      />
      {type === "image" ? (
        <img
          width={150}
          height={150}
          src={url}
          alt="img"
        />
      ) : (
        <video
          controls
          height={150}
          width={150}
          src={url}
        ></video>
      )}
    </div>
  );
}

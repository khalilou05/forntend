import { useImgModalCtx } from "@/context/ImgModalCtx";
import style from "@/css/imageModal.module.css";
import fetchApi from "@/lib/fetch";
import { FILE_SERVER } from "@/settings";
import type { Media } from "@/types/types";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import Button from "./Button";
import CheckBox from "./CheckBox";
import ErrorMsg from "./ErrorMsg";
import FileUploadDropZone from "./FileUploadDropZone";
import Modal from "./Modal";
import { SquareSkeleteon } from "./Skeleteon";

export default function ImageModal() {
  const [selectedImg, setSelectedImg] = useState<Media[]>([]);
  const [media, setMedia] = useState<Media[]>([]);

  const [error, setError] = useState("");
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const cache = useRef<Media[]>([]);
  const firstOpen = useRef(false);

  const { closeModal, isOpen, imgModalcallBack } = useImgModalCtx();

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
      const filtredMedia = media?.filter((itm) => !imgId.includes(itm.id));
      // setMedia(filtredMedia || []);
      setSelectedImg([]);
    }
  };

  const handleImgUpload = async (e: ChangeEvent<HTMLInputElement>) => {
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
    if (data) setMedia((prv) => [...data, ...prv]);
  };

  const getImages = async () => {
    if (!firstOpen.current) return;
    console.log("first open");

    // const { data, error } = await fetchApi<Media[]>("/media");
    // if (data) setMedia(data);
    if (error) setError(error);
  };

  const handleConfirm = () => {
    imgModalcallBack.current?.(selectedImg);
    closeModal();
  };

  useEffect(() => {
    firstOpen.current = true;
    getImages();
  }, [isOpen]);

  return (
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
            onClick={handleConfirm}
            buttonType={"primary"}
          >
            إضافة
          </Button>
        </>
      )}
    >
      <div className={style.add_sec_warp}>
        <div className={style.add_sec}>
          <FileUploadDropZone
            content={() => <p>qs</p>}
            uploadCallBack={handleImgUpload}
          />
        </div>
      </div>
      {error && <ErrorMsg msg={error} />}
      <div className={style.content}>
        {media?.map((item) => (
          <Media
            media={item}
            inSelection={inSelection}
            handleSelectImage={handleSelectImage}
            key={item.id}
          />
        ))}
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

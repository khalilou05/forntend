import VideoIcon from "@/assets/icons/video";
import style from "@/css/component/editor.module.css";
import React, { useState } from "react";
import Button from "../Button";
import Modal from "../Modal";
import ToolTip from "../ToolTip";

type Prop = {
  addVideo: (value: string) => void;
};

export default function AddVideoModal({ addVideo }: Prop) {
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <Modal
      isOpen={isOpen}
      style={{
        height: "300px",
        width: "500px",
      }}
      backdrop
      animatedColse={false}
      closeModal={closeModal}
      openModal={openModal}
      title="إضافة فيديو"
      render={(handleOpen) => (
        <ToolTip value="إضافة فيديو">
          <button
            onClick={handleOpen}
            className={style.btn}
          >
            <VideoIcon size={20} />
          </button>
        </ToolTip>
      )}
      footerRender={(handleClose) => (
        <>
          <Button
            onClick={() => {
              handleClose();
              setValue("");
            }}
            buttonType="secandary"
          >
            إلغاء
          </Button>
          <Button
            onClick={() => {
              addVideo(value);
              setValue("");
              handleClose();
            }}
            disabled={value.length ? false : true}
            buttonType={value.length ? "primary" : "disabled"}
          >
            إضافة
          </Button>
        </>
      )}
    >
      <div className={style.addVideoModal}>
        <label>قم بلصق كود الفيديو في الأسفل</label>
        <textarea
          value={value}
          onChange={handleChange}
        ></textarea>
        <label>الكود يبدأ عموما بـ : &lt;iframe&gt;</label>
      </div>
    </Modal>
  );
}

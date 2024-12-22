import ToolTip from "../ToolTip";
import VideoIcon from "@/assets/icons/video";
import style from "@/css/component/editor.module.css";
import Modal from "../Modal";
import React, { useState } from "react";
import Button from "../Button";

type Prop = {
  addVideo: (value: string) => void;
};

export default function AddVideoBtn({ addVideo }: Prop) {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return (
    <Modal
      height={200}
      modalTitle="إضافة فيديو"
      render={(handleOpen) => (
        <ToolTip value="إضافة فيديو">
          <button onClick={handleOpen} className={style.btn}>
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
            type="secandary"
          >
            إلغاء
          </Button>
          <Button
            onClick={() => {
              addVideo(value);
              handleClose();
              setValue("");
            }}
            disabled={value.length ? false : true}
            type={value.length ? "primary" : "disabled"}
          >
            إضافة
          </Button>
        </>
      )}
    >
      <div className={style.addVideoModal}>
        <label>قم بلصق كود الفيديو في الأسفل</label>
        <textarea onChange={handleChange}></textarea>
        <label>الكود يبدأ عموما بـ : &lt;iframe&gt;</label>
      </div>
    </Modal>
  );
}

import ToolTip from "../ToolTip";
import Image from "@/assets/icons/image";
import style from "@/css/component/editor.module.css";
import Modal from "../Modal";
import { useState } from "react";

export default function AddImageBtn() {
  return (
    <Modal
      height={600}
      width={1000}
      modalTitle="إضافة صور"
      render={(handleClick) => (
        <ToolTip value="إضافة صور">
          <button onClick={handleClick} className={style.btn}>
            <Image size={20} />
          </button>
        </ToolTip>
      )}
    >
      <p>khalil</p>
    </Modal>
  );
}

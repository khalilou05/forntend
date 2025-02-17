import ToolTip from "../ToolTip";
import Image from "@/assets/icons/image";
import style from "@/css/component/editor.module.css";
import Modal from "../Modal";
import { useState } from "react";

export default function AddImageBtn() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Modal
      closeModal={() => setIsOpen(false)}
      isOpen={isOpen}
      width={1000}
      title="إضافة صور"
      render={(handleClick) => (
        <ToolTip value="إضافة صور">
          <button
            onClick={handleClick}
            className={style.btn}
          >
            <Image size={20} />
          </button>
        </ToolTip>
      )}
    >
      <p>khalil</p>
    </Modal>
  );
}

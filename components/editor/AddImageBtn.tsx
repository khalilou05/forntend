import Image from "@/assets/icons/image";
import style from "@/css/component/editor.module.css";
import { useState } from "react";
import Modal from "../Modal";
import ToolTip from "../ToolTip";

export default function AddImageBtn() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Modal
      closeModal={() => setIsOpen(false)}
      isOpen={isOpen}
      title="إضافة صور"
      component={(handleClick) => (
        <ToolTip<HTMLButtonElement>
          value="إضافة صور"
          component={(ref) => (
            <button
              ref={ref}
              onClick={handleClick}
              className={style.btn}
            >
              <Image size={20} />
            </button>
          )}
        />
      )}
    >
      <p>khalil</p>
    </Modal>
  );
}

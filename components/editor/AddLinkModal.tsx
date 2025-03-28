import style from "@/css/component/editor.module.css";
import Modal from "../Modal";

import LinkIcon from "@/assets/icons/link";
import React, { useState } from "react";
import Button from "../Button";
import Input from "../Input";
import SelectInput from "../SelectInput";
import ToolTip from "../ToolTip";

export default function AddLinkModal() {
  const [link, setLink] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
  };

  return (
    <Modal
      isOpen={isOpen}
      openModal={() => setIsOpen(true)}
      closeModal={() => setIsOpen(false)}
      title="إضافة رابط"
      render={(handleOpen) => (
        <ToolTip value="إضافة رابط">
          <button
            className={style.btn}
            onClick={handleOpen}
          >
            <LinkIcon size={20} />
          </button>
        </ToolTip>
      )}
      footerRender={(handleClose) => (
        <>
          <Button
            onClick={handleClose}
            buttonType="secandary"
          >
            إلغاء
          </Button>
          <Button
            disabled={!!link.length}
            buttonType={!!link.length ? "primary" : "disabled"}
          >
            إضافة
          </Button>
        </>
      )}
    >
      <div className={style.addLink_modal}>
        <div className={style.column}>
          <label>رابط الي</label>
          <Input
            dir="ltr"
            placeholder="https://"
            onChange={handleChange}
          />
        </div>
        <div className={style.column}>
          <label>فتح هذا الرابط في</label>
          <SelectInput>
            <option>نافذة جديدة</option>
            <option>نفس النافذة</option>
          </SelectInput>
        </div>
      </div>
    </Modal>
  );
}

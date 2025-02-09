import Modal from "../Modal";
import style from "@/css/component/editor.module.css";

import ToolTip from "../ToolTip";
import LinkIcon from "@/assets/icons/link";
import SelectInput from "../SelectInput";
import Button from "../Button";
import React, { useState } from "react";
import Input from "../Input";

export default function AddLinkModal({
  hasSelected,
}: {
  hasSelected: boolean;
}) {
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
            disabled={!hasSelected}
            className={hasSelected ? style.btn : style.btn_disabled}
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

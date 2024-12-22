import Modal from "../Modal";
import style from "@/css/component/editor.module.css";

import ToolTip from "../ToolTip";
import LinkIcon from "@/assets/icons/link";
import SelectInput from "../SelectInput";
import Button from "../Button";
import React, { useState } from "react";
export default function AddLinkBtn({ hasSelected }: { hasSelected: boolean }) {
  const [link, setLink] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
  };
  return (
    <Modal
      modalTitle="إضافة رابط"
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
          <Button onClick={handleClose} type="secandary">
            إلغاء
          </Button>
          <Button
            disabled={!!link.length}
            type={!!link.length ? "primary" : "disabled"}
          >
            إضافة
          </Button>
        </>
      )}
    >
      <div className={style.addLink_modal}>
        <div className={style.column}>
          <label>رابط الي</label>
          <input
            dir="ltr"
            placeholder="https://"
            onChange={handleChange}
            type="text"
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

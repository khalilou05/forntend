import style from "@/css/route/add_order.module.css";
import React, { useState } from "react";

import { SearchInput } from "@/components/inputGroup";
import Button from "../Button";
import Card from "../Card";
import Modal from "../Modal";
function ArticleSearchInput() {
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setselectedProduct] = useState();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setIsOpen(true);
  };

  const handleClose = () => {
    setValue("");
    setIsOpen(false);
  };

  return (
    <Card>
      <div className={style.title}>المنتجات</div>
      <div className={style.search_bar}>
        <div className={style.input_search}>
          <SearchInput
            value={value}
            onChange={handleChange}
            placeholder="إبحث عن منتجات"
          />
        </div>
        <Modal
          isOpen={isOpen}
          closeModal={handleClose}
          openModal={() => setIsOpen(true)}
          title="بحث عن منتج"
          component={(handleOpen) => (
            <Button
              onClick={handleOpen}
              buttonType="secandary"
            >
              عرض
            </Button>
          )}
        >
          <SearchInput
            autoFocus
            onChange={handleChange}
            placeholder="إبحث عن منتجات"
            value={value}
          />
        </Modal>
      </div>
    </Card>
  );
}

export default ArticleSearchInput;

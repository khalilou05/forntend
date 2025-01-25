import React, { useEffect, useState } from "react";
import style from "@/css/route/add_order.module.css";

import SearchInput from "../SearchInput";
import Card from "../Card";
import Modal from "../Modal";
import Button from "../Button";
function ArticleSearchInput() {
  const [value, setValue] = useState("");
  const [outOpen, setOutOpen] = useState(false);
  const [selectedProduct, setselectedProduct] = useState();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setOutOpen(true);
  };

  const closeModal = () => {
    setOutOpen(false);
    setValue("");
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
          outOpen={outOpen}
          setOutClose={closeModal}
          modalTitle="بحث عن منتج"
          render={(handleOpen) => (
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

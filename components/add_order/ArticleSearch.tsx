import React, { useEffect, useState } from "react";
import style from "@/css/route/add_order.module.css";
import ArticleSearchModal from "@/components/add_order/SearchArticleModal";
import SearchInput from "../SearchInput";
import Card from "../Card";
function ArticleSearchInput() {
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setselectedProduct] = useState();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setValue("");
  };
  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <Card
      flexDirection="column"
      display="flex"
      gap="10px"
    >
      <div className={style.title}>المنتجات</div>
      <div className={style.search_bar}>
        <div className={style.input_search}>
          <SearchInput
            value={value}
            onChange={onChange}
            placeholder="إبحث عن منتجات"
          />
        </div>
        <ArticleSearchModal
          isOpen={isOpen}
          value={value}
          openModal={openModal}
          closeModal={closeModal}
        />
      </div>
    </Card>
  );
}

export default ArticleSearchInput;

import { Context } from "@/context/AddProductContext";
import style from "@/css/route/addArticle.module.css";
import type { Media, Product } from "@/types/types";
import { useContext } from "react";
import ProductImage from "./add_article/ProductImage";
import Card from "./Card";
import Editor from "./editor/Editor";
import Input from "./Input";

type Prop = {
  mediaList: Media[];
  setMediaList: React.Dispatch<React.SetStateAction<Media[]>>;
  handleProductUpdate: (
    prop: keyof Product,
    value: string | number | boolean
  ) => void;
};

export default function ProductDetails() {
  const { handleProductUpdate } = useContext(Context);

  return (
    <Card
      className={style.product_info}
      style={{ gap: 10 }}
    >
      <div className={style.section}>
        <label
          className={style.inpt_label}
          htmlFor="title"
        >
          العنوان
        </label>
        <Input
          placeholder="أكتب عنوان مناسب للمنتج"
          onChange={(e) => {
            handleProductUpdate("title", e.target.value);
          }}
        />
      </div>
      <div className={style.section}>
        <Editor />
      </div>
      <div className={style.section}>
        <ProductImage />
      </div>
    </Card>
  );
}

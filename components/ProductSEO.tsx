"use client";
import PenIco from "@/assets/icons/editPen";
import { useState } from "react";
import Button from "./Button";
import Card from "./Card";
import { Input } from "./inputGroup";
import ProdcutSlug from "./ProdcutSlug";
import TextArea from "./TextArea";

export default function ProductSEO() {
  const [expand, setExpand] = useState(false);
  return (
    <Card className="style.">
      <div className="{style.header}">
        <span>تحسين محركات البحث SEO</span>
        <Button buttonType="icon">
          <PenIco />
        </Button>
      </div>
      {expand && (
        <>
          <div className="{style.desc}">
            أضف عنوانًا ووصفًا لمعرفة كيفية ظهور هذا المنتج في قائمة محركات
            البحث.
          </div>
          <label htmlFor="pageTitle">عنوان الصفحة</label>
          <Input
            type="text"
            id="pageTitle"
          />
          <label htmlFor="pageDesc">الوصف</label>
          <TextArea id="pageDesc" />
          <ProdcutSlug />
        </>
      )}
    </Card>
  );
}

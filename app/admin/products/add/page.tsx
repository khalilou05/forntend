"use client";

import style from "@/css/route/addArticle.module.css";
import { useEffect, useRef, useState } from "react";
import SelectInput from "@/components/SelectInput";
import type { Product, Images, ProductOption } from "@/types/types";
import ProductImage from "@/components/add_article/ProductImage";
import { fetchApi } from "@/api/fetchApi";
import { useRouter } from "next/navigation";
import Editor from "@/components/editor/Editor";
import CategoryInput from "@/components/add_article/CartegoryInput";
import PricingCard from "@/components/add_article/PricingCard";
import OptionCard from "@/components/add_article/OptionCard";
import Link from "next/link";

import Button from "@/components/Button";
import InputNumberArrow from "@/components/InputNumberArrow";
import HeaderNav from "@/components/HeaderNav";
import Card from "@/components/Card";
import Input from "@/components/Input";
import useFetch from "@/hooks/useFetch";

export default function AddArticle() {
  const [imageFileList, setimagefileList] = useState<Images[]>([]);

  const formData = new FormData();
  const router = useRouter();

  const [canSubmit, setCanSubmit] = useState(false);
  const [productOption, setProductOption] = useState<ProductOption[]>([]);

  const [product, setProduct] = useState<Product>({
    title: "",
    price: 0,
    prev_price: 0,
    buying_price: 0,
    global_stock: 0,
    category_id: 0,
    description: "",
    out_stock_sell: false,
    free_shipping: false,
    active: true,
    has_option: false,
  });
  const prevProduct = useRef<Product>({
    title: "",
    price: 0,
    prev_price: 0,
    buying_price: 0,
    global_stock: 0,
    category_id: 0,
    description: "",
    out_stock_sell: false,
    free_shipping: false,
    active: true,
    has_option: false,
  });

  const handleProductUpdate = (
    prop: keyof Product,
    value: string | number | boolean
  ) => {
    setProduct({ ...product, [prop]: value });
  };

  const uploadProduct = async () => {
    if (Object.values(formData).length > 0) return;
    const data = {
      product: product,
      product_option: productOption,
    };
    formData.append("data", JSON.stringify(data));
    for (const image of imageFileList) {
      formData.append("images", image.image);
    }
    const { response } = useFetch("/product", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (response.statusNumber === 201) router.back();
  };

  // const checkProduct = () => {
  //   const dirtyArray = [];
  //   for (const key in product) {
  //     if (product[key] !== prevProduct.current[key]) dirtyArray.push(true);
  //     else dirtyArray.push(false);
  //   }
  //   if (dirtyArray.includes(true))
  //     setIsDirty({ ...isDirty, dirtyProduct: true });
  //   else setIsDirty({ ...isDirty, dirtyProduct: false });
  // };
  // const checkImage = () => {
  //   if (imageFileList.length > 0) setIsDirty({ ...isDirty, dirtyImages: true });
  //   else setIsDirty({ ...isDirty, dirtyImages: false });
  // };

  // useEffect(() => {
  //   checkProduct();
  // }, [JSON.stringify(product)]);

  // useEffect(() => {
  //   checkImage();
  // }, [imageFileList.length]);

  // useEffect(() => {
  //   window.history.pushState(null, document.title, window.location.href);

  //   const handleUnload = (e: PopStateEvent) => {
  //     window.history.pushState(null, document.title, location.href);
  //     if (isDirty) {
  //       const response = window.confirm(
  //         "معلومات المنتج غير مسجلة ! هل تريد مغادرة الصفحة"
  //       );
  //     } else router.back();
  //   };
  //   const handleClick = (e: MouseEvent) => {
  //     const anschor = e.target as HTMLAnchorElement;
  //     if (isDirty) {
  //       e.preventDefault();
  //       const response = window.confirm(
  //         "معلومات المنتج غير مسجلة ! هل تريد مغادرة الصفحة"
  //       );
  //       if (!response) return;
  //       else router.push(anschor.href);
  //     }
  //   };
  //   window.addEventListener("popstate", handleUnload);
  //   document
  //     .querySelectorAll("a")
  //     .forEach((el) => el.addEventListener("click", handleClick));

  //   const handleBeforeUnload = (e: BeforeUnloadEvent) => {
  //     e.preventDefault();
  //   };

  //   window.addEventListener("beforeunload", handleBeforeUnload);
  //   return () => {
  //     window.removeEventListener("popstate", handleUnload);
  //     window.removeEventListener("beforeunload", handleBeforeUnload);

  //     document
  //       .querySelectorAll("a")
  //       .forEach((el) => el.removeEventListener("click", handleClick));
  //   };
  // }, [isDirty]);

  useEffect(() => {
    document.title = "إضافة منتج";
  }, []);
  useEffect(() => {
    if (productOption.length) {
      setProduct((prv) => ({ ...prv, has_option: true }));
    } else {
      setProduct((prv) => ({ ...prv, has_option: false }));
    }
  }, [productOption.length]);

  return (
    <main className={style.body}>
      <HeaderNav title="إضافة منتج" />
      <div className={style.column_container}>
        <div className={style.right_column}>
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
              <Editor handleProductUpdate={handleProductUpdate} />
            </div>
            <div className={style.section}>
              <ProductImage
                imageFileList={imageFileList}
                setimageFileList={setimagefileList}
              />
            </div>
          </Card>

          <PricingCard
            product={product}
            setProduct={setProduct}
          />
          <OptionCard
            options={productOption}
            setProductOption={setProductOption}
          />

          <Button
            buttonType={canSubmit ? "primary" : "disabled"}
            disabled={canSubmit}
            onClick={uploadProduct}
          >
            إضافة
          </Button>
        </div>

        <div className={style.left_column}>
          <Card
            title="حالة المنتج"
            style={{ gap: 10 }}
          >
            <SelectInput
              onChange={(e) =>
                handleProductUpdate("active", !!Number(e.target.value))
              }
            >
              <option value={1}>مفعل</option>
              <option value={0}>غير مفعل</option>
            </SelectInput>
          </Card>
          <Card
            title="التوصيل"
            style={{ gap: 10 }}
          >
            <SelectInput
              onChange={(e) =>
                handleProductUpdate("free_shipping", !!Number(e.target.value))
              }
            >
              <option value={0}>غير مجاني</option>
              <option value={1}>مجاني</option>
            </SelectInput>
          </Card>

          <Card style={{ gap: 10 }}>
            <div className={style.title}>المخزون</div>

            <InputNumberArrow onChange={() => handleProductUpdate} />
            <div>
              <input
                onChange={(e) =>
                  handleProductUpdate("out_stock_sell", e.target.checked)
                }
                type="checkbox"
              />
              <span>إستقبال الطلبيات بعد نفاذ المخزون</span>
            </div>
          </Card>
          <Card
            title="الفئة"
            style={{ gap: 10 }}
          >
            <CategoryInput setProdct={setProduct} />
          </Card>
        </div>
      </div>
    </main>
  );
}

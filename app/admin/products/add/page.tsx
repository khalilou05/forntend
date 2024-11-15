"use client";

import style from "@/css/route/addArticle.module.css";
import { useEffect, useRef, useState } from "react";
import SelectInput from "@/components/SelectInput";
import type { Product, ProductOption, Images } from "@/types/types";
import ImageManager from "@/components/add_article/ImageManager";
import { fetchApi } from "@/api/fetchApi";
import { useRouter } from "next/navigation";
import Editor from "@/components/add_article/Editor";
import CategoryInput from "@/components/add_article/CartegoryInput";
import PricingCard from "@/components/add_article/PricingCard";
import OptionCard from "@/components/add_article/OptionCard";
import Link from "next/link";
import RightArrowIcon from "@/assets/icons/rightArrow";
import Button from "@/components/Button";

export default function AddArticle() {
  const [imageFileList, setimagefileList] = useState<Images[]>([]);
  const [isDirty, setIsDirty] = useState({
    dirtyProduct: false,
    dirtyProductOption: false,
    dirtyImages: false,
  });
  const data = new FormData();
  const [productOption, setProductOption] = useState<ProductOption[]>([]);
  const [canSubmit, setCanSubmit] = useState(false);
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
  const router = useRouter();
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
    data.append("product", JSON.stringify(product));
    data.append("product_option", JSON.stringify(productOption));
    for (const image of imageFileList) {
      data.append("images", image.image);
    }
    const response = await fetchApi("/product", {
      method: "POST",
      body: data,
    });
    if (response?.status === 201) router.back();
  };

  const checkProduct = () => {
    const dirtyArray = [];
    for (const key in product) {
      if (product[key] !== prevProduct.current[key]) dirtyArray.push(true);
      else dirtyArray.push(false);
    }
    if (dirtyArray.includes(true))
      setIsDirty({ ...isDirty, dirtyProduct: true });
    else setIsDirty({ ...isDirty, dirtyProduct: false });
  };
  const checkImage = () => {
    if (imageFileList.length > 0) setIsDirty({ ...isDirty, dirtyImages: true });
    else setIsDirty({ ...isDirty, dirtyImages: false });
  };
  const checkProductOption = () => {
    if (productOption.length === 0) return;
    const dirtyArray: boolean[] = [];
    productOption.forEach((option) => {
      if (option.name === "") dirtyArray.push(true);
      else dirtyArray.push(false);
      option.items.forEach((item) => {
        if (item.item_name === "" || item.price === 0 || item.stock === 0)
          dirtyArray.push(true);
        else dirtyArray.push(false);
      });
    });
    if (dirtyArray.includes(true))
      setIsDirty({ ...isDirty, dirtyProductOption: true });
    else setIsDirty({ ...isDirty, dirtyProductOption: false });
  };

  useEffect(() => {
    checkProduct();
  }, [JSON.stringify(product)]);

  useEffect(() => {
    checkImage();
  }, [imageFileList.length]);

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

  return (
    <main className={style.body}>
      <div className={style.navBar}>
        <Link href={"/admin/products"}>
          <span>
            <RightArrowIcon size={20} />
          </span>
        </Link>
        إضافة منتج
      </div>
      <div className={style.column_container}>
        <div className={style.right_column}>
          <div className={style.article_info_card}>
            <div className={style.title_sec}>
              <label
                className={style.inpt_label}
                htmlFor="title"
              >
                العنوان
              </label>
              <input
                onChange={(e) => {
                  handleProductUpdate("title", e.target.value);
                }}
                name="title"
                type="text"
              />
            </div>
            <div className={style.editor_sec}>
              <Editor handleProductUpdate={handleProductUpdate} />
            </div>
            <div className={style.image_sec}>
              <ImageManager
                imageFileList={imageFileList}
                setimageFileList={setimagefileList}
              />
            </div>
          </div>

          <PricingCard
            product={product}
            handleChange={handleProductUpdate}
          />
          <OptionCard
            options={productOption}
            setOption={setProductOption}
            handleProductUpdate={handleProductUpdate}
          />

          <Button
            className={style.submit_btn}
            type={canSubmit ? "primary" : "disabled"}
            disabled={canSubmit ? false : true}
            onClick={uploadProduct}
          >
            إضافة
          </Button>
        </div>
        <div className={style.left_column}>
          <div className={style.status_card}>
            <div className={style.title}>حالة المنتج</div>
            <SelectInput
              onChange={(e) =>
                handleProductUpdate("active", !!Number(e.target.value))
              }
            >
              <option value={1}>مفعل</option>
              <option value={0}>غير مفعل</option>
            </SelectInput>
          </div>
          <div className={style.shipping_card}>
            <div className={style.title}>التوصيل</div>
            <SelectInput
              onChange={(e) =>
                handleProductUpdate("free_shipping", !!Number(e.target.value))
              }
            >
              <option value={0}>غير مجاني</option>
              <option value={1}>مجاني</option>
            </SelectInput>
          </div>

          <div className={style.stock_card}>
            <div className={style.title}>المخزون</div>
            <input
              onChange={(e) =>
                handleProductUpdate("global_stock", Number(e.target.value))
              }
              type="text"
            />
            <div>
              <input
                onChange={(e) =>
                  handleProductUpdate("out_stock_sell", e.target.checked)
                }
                type="checkbox"
              />
              <span>إستقبال الطلبيات بعد نفاذ المخزون</span>
            </div>
          </div>
          <div className={style.category_card}>
            <div className={style.title}>الفئة</div>
            <CategoryInput handleChange={handleProductUpdate} />
          </div>
          {/* <button onClick={() => console.log(prevProduct)}>
            log prev product
          </button>
          <button onClick={() => console.log(product)}>
            log product product
          </button>
          <button onClick={() => console.log(isDirty)}>is dirty </button> */}
        </div>
      </div>
    </main>
  );
}

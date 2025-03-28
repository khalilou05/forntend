"use client";

import PricingCard from "@/components/add_article/PricingCard";

import style from "@/css/route/addArticle.module.css";
import type { Product } from "@/types/types";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import HeaderNav from "@/components/HeaderNav";
import ProductDetails from "@/components/ProductDetails";
import ProductOption from "@/components/ProductOption";
import ProductShipping from "@/components/ProductShipping";
import ProductStatus from "@/components/ProductStatus";
import ProductStock from "@/components/ProductStock";

import ProductCategory from "@/components/ProductCategory";
import PageProvider from "@/context/AddProductContext";
import { ImgModlProvider } from "@/context/ImgModalContext";

export default function AddArticle() {
  const [canSubmit, setCanSubmit] = useState(false);
  const router = useRouter();

  const cache = useRef<Product>({
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

  // const checkProduct = () => {
  //   const dirtyArray = [];
  //   for (const key in product) {
  //     if (product[key] !== cache.current[key]) dirtyArray.push(true);
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

  return (
    <PageProvider>
      <ImgModlProvider>
        <div className={style.body}>
          <HeaderNav title="إضافة منتج" />

          <div className={style.column_container}>
            <div className={style.right_column}>
              <ProductDetails />
              <PricingCard />
              <ProductOption />
            </div>

            <div className={style.left_column}>
              <ProductStatus />
              <ProductShipping />
              <ProductStock />
              <ProductCategory />
            </div>
          </div>
        </div>
      </ImgModlProvider>
    </PageProvider>
  );
}

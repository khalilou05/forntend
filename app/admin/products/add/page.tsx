"use client";

import style from "@/css/route/addArticle.module.css";
import { useEffect, useRef, useState } from "react";
import SelectInput from "@/components/SelectInput";
import type { Product, ProductOption, Media } from "@/types/types";
import ProductImage from "@/components/add_article/ProductImage";
import { useRouter } from "next/navigation";
import Editor from "@/components/editor/Editor";
import CategoryInput from "@/components/add_article/CartegoryInput";
import PricingCard from "@/components/add_article/PricingCard";
import OptionCard from "@/components/add_article/OptionCard";

import Button from "@/components/Button";
import InputNumberArrow from "@/components/InputNumberArrow";
import HeaderNav from "@/components/HeaderNav";
import Card from "@/components/Card";
import Input from "@/components/Input";
import useFetch from "@/hooks/useFetch";
import ImageModal from "@/components/ImageModal";
import CheckBox from "@/components/CheckBox";
import fetchApi from "@/lib/fetch";

export default function AddArticle() {
  const [mediaList, setMediaList] = useState<Media[]>([]);
  const router = useRouter();
  const editorRef = useRef<HTMLDivElement | null>(null);
  const [canSubmit, setCanSubmit] = useState(false);
  const [productOption, setProductOption] = useState<ProductOption[]>([]);
  const imageModalAction = useRef<((images: Media[]) => void) | null>(null);
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

  const [imgModalState, setImgModalState] = useState<{
    isOpen: boolean;
    mediaList: Media[];
    selectionMode: "single" | "multiple";
  }>({
    isOpen: false,
    mediaList: [],
    selectionMode: "single",
  });

  const handleProductUpdate = (
    prop: keyof Product,
    value: string | number | boolean
  ) => {
    setProduct({ ...product, [prop]: value });
  };

  const uploadProduct = async () => {
    const formData = new FormData();
    const data = {
      product: product,
      product_option: productOption,
    };
    formData.append("data", JSON.stringify(data));

    const { status } = await fetchApi("/product", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (status === 201) router.back();
  };

  const closeImgModal = () => {
    setImgModalState((prv) => ({ ...prv, isOpen: false }));
  };

  const appendImgToEditor = (medias: Media[]) => {
    for (const media of medias) {
      if (media.type === "video") {
        editorRef.current?.insertAdjacentHTML(
          "beforeend",
          `<video width="95%" controls src=${media.url}></video>`
        );
      } else {
        editorRef.current?.insertAdjacentHTML(
          "beforeend",
          `<p>
            <img width="95%"  src=${media.url} />
          </p>`
        );
      }
    }
  };
  const openImgModal = (
    selectionMode: "single" | "multiple",
    openFor: Media[],
    callBack: (images: Media[]) => void
  ) => {
    setImgModalState({
      isOpen: true,
      mediaList: openFor,
      selectionMode: selectionMode,
    });
    imageModalAction.current = callBack;
  };
  const handleImgUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    callBack: (data: Media[]) => void
  ) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    const formData = new FormData();
    for (const file of files) {
      formData.append("medias", file);
    }
    const { data, status } = await fetchApi<Media[]>("/media", {
      method: "POST",
      body: formData,
    });

    if (data) callBack(data);
  };

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
  // useEffect(() => {
  //   if (productOption.length) {
  //     setProduct((prv) => ({ ...prv, has_option: true }));
  //   } else {
  //     setProduct((prv) => ({ ...prv, has_option: false }));
  //   }
  // }, [productOption.length]);

  return (
    <main className={style.body}>
      {/* <button onClick={() => console.log(selectedDescImg.current)}>qsd</button> */}
      <HeaderNav title="إضافة منتج" />
      <ImageModal
        {...imgModalState}
        handleImgUpload={handleImgUpload}
        closeModal={closeImgModal}
        callBack={imageModalAction.current}
      />
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
              <Editor
                ref={editorRef}
                openImgModal={() =>
                  openImgModal("multiple", [], appendImgToEditor)
                }
              />
            </div>
            <div className={style.section}>
              <ProductImage
                openForProductImg={() =>
                  openImgModal("multiple", mediaList, setMediaList)
                }
                handleImgUpload={handleImgUpload}
                setMediaList={setMediaList}
                mediaList={mediaList}
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
              <option value={1}>ظاهر في الموقع</option>
              <option value={0}>مخفي</option>
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

            <InputNumberArrow
              handleInputChange={(value) =>
                handleProductUpdate("global_stock", value)
              }
            />
            <div>
              <CheckBox
                onChange={(e) =>
                  handleProductUpdate("out_stock_sell", e.target.checked)
                }
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

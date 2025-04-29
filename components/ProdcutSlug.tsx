import style from "@/css/productslug.module.css";
import fetchApi from "@/lib/fetch";
import { useEffect, useState } from "react";
import { Input } from "./inputGroup";
export default function ProdcutSlug() {
  const [slug, setSlug] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const urlParams = new URLSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlug(e.target.value);
  };

  const checkSlug = async () => {
    if (slug === "") return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    urlParams.set("slug", slug);
    const { status } = await fetchApi(`/product?${urlParams.toString()}`);
    if (status === 200) {
      setIsValid(true);
    } else setIsValid(false);
  };
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      checkSlug();
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [slug]);
  return (
    <div className={style.slug_warper}>
      <label htmlFor="slug">رابط المنتج</label>
      <div className={style.input_warper}>
        <Input />
      </div>
    </div>
  );
}

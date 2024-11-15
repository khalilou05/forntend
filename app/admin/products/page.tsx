"use client";

import style from "@/css/route/manage_article.module.css";

import { useEffect, useState } from "react";
import { fetchApi } from "@/api/fetchApi";
import Link from "next/link";

function ArticleManager() {
  const [article, setArticle] = useState<null>(null);
  const [status, setStatus] = useState("loading");
  // useEffect(() => {
  //   const controller = new AbortController();
  //   (async () => {
  //     try {
  //       const data = await fetchApi("/admin/article", {
  //         signal: controller.signal,
  //       });
  //       if (data) {
  //         setStatus("done");
  //         return;
  //       }
  //       setStatus("error");
  //     } catch (err) {
  //       setStatus("error");
  //     }
  //     return () => controller.abort();
  //   })();
  // }, []);

  return (
    <section className={style.card_container}>
      <Link href={"/admin/products/add"}>إضافة منتج</Link>
    </section>
  );
}

export default ArticleManager;

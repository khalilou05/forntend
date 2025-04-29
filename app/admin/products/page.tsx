"use client";

import { useEffect, useState } from "react";

import Card from "@/components/Card";
import Link from "next/link";

export default function ArticleManager() {
  useEffect(() => {
    document.title = "إدارة المنتجات";
  }, []);

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
    <Card>
      <Link href={"/admin/products/add"}>إضافة منتج</Link>
    </Card>
  );
}

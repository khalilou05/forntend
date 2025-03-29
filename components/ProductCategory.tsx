"use client";

import CategoryInput from "@/components/add_article/CartegoryInput";
import Card from "./Card";

export default function ProductCategory() {
  return (
    <Card
      title="الفئة"
      style={{ gap: 10 }}
    >
      <CategoryInput />
    </Card>
  );
}

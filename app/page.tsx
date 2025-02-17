import React from "react";
import ArticleCard from "@/components/Article";
import fetchApi from "@/lib/fetch";
type Article = {
  id: number;
  title: string;
  img_url: string;
};
async function HomePage() {
  const resp = await fetchApi<Article[]>("/");

  return (
    <>
      {resp?.data?.map((article) => (
        <ArticleCard
          key={article.id}
          {...article}
        />
      ))}
    </>
  );
}

export default HomePage;

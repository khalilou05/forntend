import React from "react";

type Article = {
  id: number;
  title: string;
  img_url: string;
};

function articleCard({ ...article }: Article) {
  return <div>{article.title}</div>;
}

export default articleCard;

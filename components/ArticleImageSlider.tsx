"use client";
import React, { useState } from "react";
import Image from "next/image";
import { SERVER_IP } from "@/settings";
type ImageSliderProp = {
  imageUrlList: string[];
};

function ArticleImageSlider({ imageUrlList }: ImageSliderProp) {
  const [imgIndex, setImgIndex] = useState(0);

  function goNext() {
    setImgIndex((prv) => (prv === imageUrlList.length - 1 ? 0 : prv + 1));
  }
  function goBack() {
    if (imageUrlList?.length) {
      setImgIndex((prv) => (prv === 0 ? imageUrlList.length - 1 : prv - 1));
    }
  }

  return (
    <>
      {imageUrlList?.map((item, index) => {
        return (
          <Image
            key={index}
            src={`${SERVER_IP}/static/${item}`}
            fill
            alt="img"
            style={{
              aspectRatio: 1 / 1,
              right: `${-100 * index}%`,
              translate: `${-100 * imgIndex}%`,
              transition: "translate 300ms",
              userSelect: "none",
              willChange: "translate",
              flexShrink: 0,
            }}
          />
        );
      })}
    </>
  );
}

export default ArticleImageSlider;

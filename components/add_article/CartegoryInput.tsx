import { fetchApi } from "@/api/fetchApi";
import ArrowIcon from "@/assets/icons/selectArrow";
import style from "@/css/component/categoryInput.module.css";
import type { Product, Category } from "@/types/types";
import React, { useEffect, useRef, useState } from "react";
import Loading from "@/components/Loding";
import { createPortal } from "react-dom";
export default function CartegoryInput({
  handleChange,
}: {
  handleChange: (prop: keyof Product, value: number) => void;
}) {
  const [isExpand, setExpand] = useState(false);
  const [inputValue, setinputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState<Category[]>([]);
  const dropDownRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [portalStyle, setportalStyle] = useState({
    left: 0,
    top: 0,
    width: 0,
  });

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    setportalStyle({
      left: left + window.scrollX,
      top: top + window.scrollY + height,
      width: width,
    });
    setExpand(true);
  };
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (
        !dropDownRef.current?.contains(e.target as Node) &&
        !inputRef.current?.contains(e.target as Node)
      ) {
        setExpand(false);
      }
    };
    if (isExpand) {
      window.addEventListener("mousedown", handleMouseDown);
    } else {
      window.removeEventListener("mousedown", handleMouseDown);
    }
  }, [isExpand]);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await fetchApi<Category[]>("/category");
      if (response?.data) {
        setCategory(response.data);
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <div className={style.select_warper}>
        <input
          ref={inputRef}
          onClick={handleClick}
          value={inputValue}
          readOnly
          type="text"
        />
        <ArrowIcon size={"20px"} />
      </div>

      {isExpand &&
        createPortal(
          <div
            ref={dropDownRef}
            className={style.popUp}
            style={{
              top: portalStyle.top,
              left: portalStyle.left,
              width: portalStyle.width,
            }}
          >
            {loading ? (
              <Loading size="10px" />
            ) : (
              category.map((item) => (
                <div
                  onClick={() => {
                    handleChange("category_id", item.id);
                    setinputValue(item.name);
                    setExpand(false);
                  }}
                  key={item.id}
                >
                  {item.name}
                </div>
              ))
            )}
          </div>,
          document.body
        )}
    </>
  );
}

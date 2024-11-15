import React, { ReactNode, useEffect, useRef, useState } from "react";
import style from "@/css/component/dropdown.module.css";
import { createPortal } from "react-dom";
import { ThreeDot } from "@/assets/icons/threeDot";
import EyeOpenIco from "@/assets/icons/eyeOpen";
import BanIco from "@/assets/icons/ban";
import TrashIco from "@/assets/icons/trash";
import { useRouter } from "next/navigation";

type Props = {
  orderID: number;
};

function DropDown({ orderID }: Props) {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [elmStyle, setElemStyle] = useState({});
  const [isOpen, setOpen] = useState(false);
  const [shouldSlideUp, setShouldSlideUp] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleClose = (e: MouseEvent) => {
      if (
        btnRef.current &&
        e.target instanceof Node &&
        !btnRef.current.contains(e.target) &&
        !contentRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClose);
    else {
      document.removeEventListener("mousedown", handleClose);
    }
    return () => document.removeEventListener("mousedown", handleClose);
  }, [isOpen]);
  return (
    <>
      <button
        data-open={isOpen}
        ref={btnRef}
        onClick={() => {
          setOpen(!isOpen);
          const btn = btnRef.current!.getBoundingClientRect();
          if (window.innerHeight - btn.bottom <= 120) {
            setShouldSlideUp(true);
            setElemStyle({
              left: btn.left,
              bottom: window.innerHeight - btn.top,
            });
          } else {
            setElemStyle({
              top: btn.bottom,
              left: btn.left,
            });
          }
        }}
        className={style.btn}
      >
        <ThreeDot size={"15px"} />
      </button>
      {isOpen &&
        createPortal(
          <div
            style={elmStyle}
            className={shouldSlideUp ? style.contentUp : style.content}
            ref={contentRef}
            onClick={() => setOpen(false)}
          >
            <div
              onClick={() => {
                router.push(`/admin/orders/${orderID}`);
              }}
            >
              معاينة
              <EyeOpenIco size={"12px"} />
            </div>
            <div>
              حـظــر
              <BanIco size={"12px"} />
            </div>
            <div>
              حـــذف
              <TrashIco size={"12px"} />
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

export default DropDown;

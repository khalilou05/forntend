import React, { useEffect, useRef, useState } from "react";

import style from "@/css/component/imageManager.module.css";

import Portal from "../Portal";
import CheckBox from "../CheckBox";
import type { Media } from "@/types/types";

export default function Dragableimage({
  media,
  dragMode,
  fileListLength,
  imageID,
  inSelectedImage,
  selectedImageLength,

  setSelectedImage,
  setdragMode,
}: {
  media: Media;
  fileListLength: number;
  inSelectedImage: boolean;
  selectedImageLength: number;
  imageID: string;
  dragMode: boolean;
  setdragMode: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedImage: () => void;
}) {
  const [translatePos, settranslatePos] = useState({ x: 0, y: 0 });
  const [clickOffset, setclickOffset] = useState({ x: 0, y: 0 });
  const [isDraging, setisDraging] = useState(false);

  const [isReleasing, setisReleasing] = useState(false);
  const [offset, setoffset] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  });
  const original = useRef<HTMLDivElement | null>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    if (fileListLength === 1 || selectedImageLength) return;
    setisDraging(true);
    setdragMode(true);
    setclickOffset({
      x: e.clientX - offset.left,
      y: e.clientY - offset.top,
    });
  };

  useEffect(() => {
    if (!original.current) return;
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraging) return;
      const distanceX = e.clientX - offset.left - clickOffset.x;
      const distanceY = e.clientY - offset.top - clickOffset.y;

      settranslatePos({
        x: distanceX,
        y: distanceY,
      });
    };
    const handlMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      setisReleasing(true);
      setdragMode(false);
      settranslatePos({
        x: 0,
        y: 0,
      });
      setTimeout(() => {
        setisDraging(false);
        setisReleasing(false);
      }, 300);
    };

    if (isDraging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handlMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handlMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handlMouseUp);
    };
  }, [isDraging]);

  useEffect(() => {
    const updateImagePostion = () => {
      if (!original.current) return;
      const { left, top, width, height } =
        original.current?.getBoundingClientRect();
      setoffset({ left: left, top: top, width: width, height: height });
    };
    updateImagePostion();
    window.addEventListener("scrollend", updateImagePostion);
    window.addEventListener("resize", updateImagePostion);

    return () => {
      window.removeEventListener("scrollend", updateImagePostion);
      window.removeEventListener("resize", updateImagePostion);
    };
  }, [fileListLength]);

  return (
    <>
      <div
        ref={original}
        className={
          isDraging
            ? style.img_plcace_holder
            : dragMode
            ? style.dragMode
            : style.img
        }
        onMouseDown={handleMouseDown}
      >
        <CheckBox
          checked={inSelectedImage}
          onChange={setSelectedImage}
          className={style.img_checkbox}
          onMouseDown={(e) => e.stopPropagation()}
        />
        {media.type === "image" ? (
          <img
            src={media.url}
            alt="img"
            style={{ objectFit: "cover", height: "100%", width: "100%" }}
          />
        ) : (
          <video
            controls
            src={media.url}
          ></video>
        )}
      </div>

      {isDraging && (
        <Portal>
          <div
            style={{
              width: offset.width,
              height: offset.height,
              left: offset.left,
              top: offset.top,

              transform: `translate3d(${translatePos.x}px,${translatePos.y}px,0px)`,
              boxShadow: "0px 1px 8px hsl(0,0%,50%)",
              transition: isReleasing ? "transform 300ms" : "none",
              backgroundColor: "white",
              userSelect: "none",
              borderRadius: "5px",
              cursor: isReleasing ? "auto" : "grabbing",
              overflow: "hidden",
              position: "fixed",
              zIndex: 100,
            }}
          >
            {media.type === "image" ? (
              <img
                style={{
                  pointerEvents: "none",
                  objectFit: "cover",
                  height: "100%",
                  width: "100%",
                }}
                src={media.url}
                alt="img"
              />
            ) : (
              <video
                style={{
                  objectFit: "fill",
                }}
                playsInline
                src={media.url}
              ></video>
            )}
          </div>
        </Portal>
      )}
    </>
  );
}

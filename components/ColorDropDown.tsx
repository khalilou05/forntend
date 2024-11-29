"use client";
import style from "@/css/component/colorDropDown.module.css";
import { useRef, useState } from "react";
export default function page() {
  const [hsl, setHsl] = useState({
    hue: 0,
    saturation: 0,
    light: 0,
  });
  const [paletteDrager, setPaletteDrager] = useState({ x: 10, y: 10 });
  const [sliderDrager, setSliderDrager] = useState({ x: 12, y: 10 });
  const [grabing, setgrabing] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    const { x, y, width, height } = e.currentTarget.getBoundingClientRect();
    setPaletteDrager({ x: e.clientX - x, y: e.clientY - y });

    setgrabing(true);
  };
  const handleMouseUp = () => {
    setgrabing(false);
  };
  const handlePointerMove = (e: React.MouseEvent) => {
    if (grabing) {
      const { x, y, height, width } = e.currentTarget.getBoundingClientRect();
      const pX =
        e.clientX - x >= width ? width : e.clientX - x <= 0 ? 0 : e.clientX - x;
      const pY =
        e.clientY - y >= height
          ? height
          : e.clientY - y <= 0
            ? 0
            : e.clientY - y;

      setPaletteDrager({ x: pX, y: pY });
    }
  };

  const handleSliderMouseDown = (e: React.MouseEvent) => {
    const { y, height } = e.currentTarget.getBoundingClientRect();
    setSliderDrager({
      ...sliderDrager,
      y:
        e.clientY - y <= 10
          ? 10
          : e.clientY - y >= height - 10
            ? height - 10
            : e.clientY - y,
    });
    setgrabing(true);
  };
  const handleSliderMouseMove = (e: React.MouseEvent) => {
    if (grabing) {
      const { y, height } = e.currentTarget.getBoundingClientRect();
      const pos =
        e.clientY - y <= 10
          ? 10
          : e.clientY - y >= height - 10
            ? height - 10
            : e.clientY - y;
      setSliderDrager({ ...sliderDrager, y: pos });
    }
  };

  return (
    <div className={style.warper}>
      <div
        onMouseDown={handleSliderMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleSliderMouseMove}
        onMouseLeave={handleMouseUp}
        className={style.slider}
      >
        <div
          style={{
            top: 0,
            left: 0,
            transform: `translate3d(${sliderDrager.x - 5}px, ${sliderDrager.y - 5}px,0)`,
          }}
          className={style.sliderPointer}
        ></div>
      </div>
      <div
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handlePointerMove}
        onMouseLeave={handleMouseUp}
        className={style.palette}
      >
        <div
          style={{
            top: 0,
            left: 0,
            transform: `translate3d(${paletteDrager.x - 5}px, ${paletteDrager.y - 5}px,0)`,
          }}
          className={style.pointer}
        ></div>
      </div>
      <div className={style.row_warper}>
        <div className={style.row}>
          <div className={style.color}></div>
          <div className={style.color}></div>
          <div className={style.color}></div>
          <div className={style.color}></div>
          <div className={style.color}></div>
          <div className={style.color}></div>
          <div className={style.color}></div>
        </div>
        <div className="style.row">
          <div className="{style.color}"></div>
          <div className="{style.color}"></div>
          <div className="{style.color}"></div>
          <div className="{style.color}"></div>
          <div className="{style.color}"></div>
          <div className="{style.color}"></div>
          <div className="{style.color}"></div>
        </div>
      </div>
    </div>
  );
}

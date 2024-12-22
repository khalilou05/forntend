"use client";
import style from "@/css/component/colorPalette.module.css";
import { useRef, useState } from "react";
export default function ColorPalette() {
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

  const colorList = [
    { id: 1, value: "#FF00FF" },
    { id: 2, value: "#2B00FF" },
    { id: 3, value: "#00AAFF" },
    { id: 4, value: "#80FF00" },
    { id: 5, value: "#FFFF00" },
    { id: 6, value: "#FF8000" },
    { id: 7, value: "#FF2A00" },
  ];
  const blackShades = [
    { id: 1, value: "#FFFFFF" },
    { id: 2, value: "#E6E6E6" },
    { id: 3, value: "#CCCCCC" },
    { id: 4, value: "#B3B3B3" },
    { id: 5, value: "#808080" },
    { id: 6, value: "#404040" },
    { id: 7, value: "#000000" },
  ];

  return (
    <div className={style.warper}>
      <div className={style.section}>
        <button>النص</button>
        <button>الخلفية</button>
      </div>
      <div className={style.section}>
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
      </div>

      <div className={style.section}>
        {colorList.map((color) => (
          <div
            key={color.id}
            style={{ backgroundColor: `${color.value}` }}
          ></div>
        ))}
      </div>
      <div className={style.section}>
        {blackShades.map((color) => (
          <div
            key={color.id}
            style={{ backgroundColor: `${color.value}` }}
          ></div>
        ))}
      </div>
    </div>
  );
}

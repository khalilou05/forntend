"use client";
import React, { useEffect, useRef, useState } from "react";
import style from "@/css/component/tooltip.module.css";
import { createPortal } from "react-dom";
type Prop = {
  children: React.ReactNode;
  value: string;
  width?: string;
  padding?: string;
  tooltipPosition?: "center" | "left" | "right";
  textPosition?: "start" | "end" | "center";
};
export default function ToolTip({
  children,
  value,
  tooltipPosition = "center",
  width = "auto",
  padding = "7px",
  textPosition = "start",
}: Prop) {
  const [postiotion, setpostiotion] = useState({ top: 0, x: 0 });
  const [visiblity, setVisiblity] = useState<"visible" | "hidden">("hidden");
  const [showDown, setshowDown] = useState(false);
  const [cancreatePrtal, setcancreatePrtal] = useState(false);
  const toolTipRef = useRef<HTMLDivElement | null>(null);
  const warperRef = useRef<HTMLDivElement | null>(null);

  const handleMouseEnter = () => {
    setVisiblity("visible");
    if (warperRef.current && toolTipRef.current) {
      const { top, left, width, right } =
        warperRef.current.children[0].getBoundingClientRect();
      const toltipRect = toolTipRef.current.getBoundingClientRect();
      const isBelow20 = top <= 41;

      if (isBelow20) setshowDown(true);
      else setshowDown(false);
      if (tooltipPosition === "left") {
        setpostiotion({
          top:
            (isBelow20
              ? top + toltipRect.height + 6
              : top - toltipRect.height - 6) + window.scrollY,
          x: left,
        });
        return;
      }
      if (tooltipPosition === "right") {
        setpostiotion({
          top:
            (isBelow20
              ? top + toltipRect.height + 6
              : top - toltipRect.height - 6) + window.scrollY,
          x: right - toltipRect.width,
        });
        return;
      }
      setpostiotion({
        top:
          (isBelow20
            ? top + toltipRect.height + 6
            : top - toltipRect.height - 6) + window.scrollY,
        x: left - toltipRect.width / 2 + width / 2,
      });
    }
  };
  const handleMouseLeave = () => {
    setVisiblity("hidden");
  };

  useEffect(() => {
    setcancreatePrtal(true);
  }, []);
  return (
    <>
      <div
        ref={warperRef}
        style={{ display: "contents" }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>

      {cancreatePrtal &&
        createPortal(
          <div
            ref={toolTipRef}
            className={showDown ? style.tooltipDown : style.tooltip}
            style={{
              width: width,
              padding: padding,
              visibility: visiblity,
              position: "absolute",
              top: postiotion.top,
              left: postiotion.x,
            }}
          >
            {value}
          </div>,
          document.body,
        )}
    </>
  );
}

"use client";
import React, { useEffect, useRef, useState } from "react";
import style from "@/css/component/tooltip.module.css";
import { createPortal } from "react-dom";
type Prop = {
  children: React.ReactNode;
  value: string;
  tooltipPosition?: "center" | "left" | "right";
  width?: string;
  textPosition?: "start" | "end" | "center";
};
export default function ToolTip({
  children,
  value,
  tooltipPosition = "center",
  width = "auto",
  textPosition = "start",
}: Prop) {
  const [postiotion, setpostiotion] = useState({ top: 0, x: 0 });
  const [visiblity, setVisiblity] = useState<"visible" | "hidden">("hidden");
  const [cancreatePrtal, setcancreatePrtal] = useState(false);
  const toolTipRef = useRef<HTMLDivElement | null>(null);
  const warperRef = useRef<HTMLDivElement | null>(null);

  const handleMouseEnter = () => {
    setVisiblity("visible");
    if (warperRef.current && toolTipRef.current) {
      const { top, left, width, right } =
        warperRef.current.children[0].getBoundingClientRect();
      const toltipRect = toolTipRef.current.getBoundingClientRect();
      if (tooltipPosition === "left") {
        setpostiotion({
          top: top - toltipRect.height - 3 + window.scrollY,
          x: left,
        });
        return;
      }
      if (tooltipPosition === "right") {
        setpostiotion({
          top: top - toltipRect.height - 3 + window.scrollY,
          x: right - toltipRect.width,
        });
        return;
      }
      setpostiotion({
        top: top - toltipRect.height - 3 + window.scrollY,
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
    <div
      ref={warperRef}
      style={{ display: "contents", width: "fit-content" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {cancreatePrtal &&
        createPortal(
          <div
            ref={toolTipRef}
            className={style.tooltip}
            style={{
              width: width,
              visibility: visiblity,
              position: "absolute",
              top: postiotion.top,
              left: postiotion.x,
            }}
          >
            {value}
          </div>,
          document.body
        )}
    </div>
  );
}

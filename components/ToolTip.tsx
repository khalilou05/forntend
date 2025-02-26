"use client";
import React, { useCallback, useRef, useState } from "react";
import style from "@/css/component/tooltip.module.css";

import Protal from "./Portal";

type Prop = {
  children: React.ReactNode;
  value: string;

  show?: boolean;
  tooltipPosition?: "center" | "left";
};
export default function ToolTip({
  children,
  value,
  show = true,
  tooltipPosition = "center",
}: Prop) {
  const [tooltipState, setTooltipState] = useState({
    top: 0,
    left: 0,
    showDown: false,
    visible: false,
  });

  const warperRef = useRef<HTMLDivElement | null>(null);

  const handleMouseEnter = () => {
    if (warperRef.current) {
      const { top, left, width, height } =
        warperRef.current.children[0].getBoundingClientRect();

      setTooltipState({
        top:
          top <= 41
            ? top + height + 9 + window.scrollY
            : top - height - 11 + window.scrollY,
        left: tooltipPosition === "center" ? left + width / 2 : left,
        showDown: top <= 41 ? true : false,
        visible: true,
      });
    }
  };
  const handleMouseLeave = useCallback(() => {
    setTooltipState((prv) => ({ ...prv, visible: false }));
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

      <Protal>
        <div
          className={tooltipState.showDown ? style.tooltipDown : style.tooltip}
          style={{
            display: tooltipState.visible && show ? "block" : "none",
            position: "absolute",
            top: tooltipState.top,
            left: tooltipState.left,
            transform: tooltipPosition === "center" ? "translateX(-50%)" : "",
            zIndex: 1000,
          }}
        >
          {value}
        </div>
      </Protal>
    </>
  );
}

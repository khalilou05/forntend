import { useWarperRef } from "@/context/WarperRefCtx";
import style from "@/css/tooltip.module.css";
import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";

const Portal = dynamic(() => import("./Portal"), { ssr: false });

type Prop = {
  parentRef?: React.RefObject<HTMLElement | null>;
  component: (
    ref: React.RefObject<any | null>,
    showToolTip: () => void,
    hideToolTip: () => void
  ) => React.ReactNode;
  value: string;
  show?: boolean;
  tooltipPosition?: "center" | "left";
};
export default function ToolTip({
  component,
  parentRef,
  value,
  show = true,
  tooltipPosition = "center",
}: Prop) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({
    top: 0,
    left: 0,
    showDown: false,
  });

  const { warper } = useWarperRef();

  const componentRef = useRef<HTMLElement | null>(null);
  const dropDownRef = useRef<HTMLDivElement | null>(null);
  const refToUse = parentRef ?? componentRef;

  const updatePosition = () => {
    if (!refToUse.current || !dropDownRef.current || !warper.current) return;
    console.log(refToUse.current, dropDownRef.current, componentRef.current);

    const componentRect = refToUse.current.getBoundingClientRect();
    const dropDownRect = dropDownRef.current.getBoundingClientRect();
    const warperRect = warper.current.getBoundingClientRect();

    const hasTouchedNav =
      componentRect.top + dropDownRect.height >=
      warperRect.height - warperRect.top;

    setPosition({
      top: hasTouchedNav
        ? componentRect.bottom + 2
        : componentRect.top + dropDownRect.height,
      left:
        tooltipPosition === "center"
          ? componentRect.left -
            dropDownRect.width / 2 +
            componentRect.width / 2
          : componentRect.left,
      showDown: hasTouchedNav ? true : false,
    });
  };
  const showToolTip = () => {
    updatePosition();
    setIsOpen(true);
  };
  const hideToolTip = () => setIsOpen(false);

  useEffect(() => {
    if (!isOpen) return;
    const abrtctrl = new AbortController();
    warper.current?.addEventListener(
      "scroll",
      () => {
        hideToolTip();
      },
      { signal: abrtctrl.signal }
    );

    return () => {
      abrtctrl.abort();
    };
  }, [isOpen]);

  return (
    <>
      {component(refToUse, showToolTip, hideToolTip)}

      <Portal>
        <div
          ref={dropDownRef}
          className={position.showDown ? style.tooltipDown : style.tooltip}
          style={{
            visibility: isOpen && show ? "visible" : "hidden",
            position: "absolute",
            top: position.top,
            left: position.left,

            zIndex: 1000,
          }}
        >
          {value}
        </div>
      </Portal>
    </>
  );
}

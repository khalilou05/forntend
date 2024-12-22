import { useRef, type ReactNode, useEffect, useState } from "react";
import style from "@/css/component/editor.module.css";

import ToolTip from "../ToolTip";
import Portal from "../Portal";

export default function DropDownWarper({
  isOpen,
  setIsOpen,
  children,
  toolTipValue,
  tooltipPosition = "center",
  alignCenter = false,
  icons,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  children: ReactNode;
  alignCenter?: boolean;
  toolTipValue: string;
  tooltipPosition?: "center" | "left";
  icons: ReactNode[];
}) {
  const [dropDownPosition, setDropDownPosition] = useState({ top: 0, left: 0 });
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const dropRef = useRef<HTMLDivElement | null>(null);

  const togleExpand = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = () => {
    if (btnRef.current) {
      const { top, left, height, width } =
        btnRef.current?.getBoundingClientRect();
      setDropDownPosition({
        left: alignCenter ? left + width / 2 : left,
        top: top + height + window.scrollY + 5,
      });
    }
    togleExpand();
  };
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (
        !btnRef.current?.contains(e.target as Node) &&
        !dropRef.current?.contains(e.target as Node)
      )
        togleExpand();
    };
    const handleClose = () => {
      if (!dropRef.current) return;
      const { top } = dropRef.current?.getBoundingClientRect();
      if (window.scrollY > top + window.scrollY) setIsOpen(false);
    };
    if (isOpen) {
      window.addEventListener("mousedown", handleMouseDown);
      window.addEventListener("scrollend", handleClose);
    }
    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("scrollend", handleClose);
    };
  }, [isOpen]);
  return (
    <>
      <ToolTip
        show={!isOpen}
        tooltipPosition={tooltipPosition}
        value={toolTipValue}
      >
        <button
          className={style.btn}
          data-active={isOpen}
          ref={btnRef}
          onClick={handleClick}
        >
          {icons.map((icon, i) => (
            <span key={i}>{icon}</span>
          ))}
        </button>
      </ToolTip>
      {isOpen && (
        <Portal>
          <div
            ref={dropRef}
            style={{
              position: "absolute",
              zIndex: 100,
              top: dropDownPosition.top,
              left: dropDownPosition.left,
              transform: alignCenter ? "translateX(-50%)" : "",
            }}
          >
            {children}
          </div>
        </Portal>
      )}
    </>
  );
}

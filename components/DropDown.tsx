import React, { useState, type ReactNode, useRef, useEffect } from "react";
import Portal from "./Portal";
import Card from "./Card";

type Prop = {
  component: (
    isOpen: boolean,
    ref: React.Ref<any>,
    openDropDown: () => void,
    togleDropDown: () => void
  ) => ReactNode;
  renderChildren: (closeDropDown: () => void) => ReactNode;
  align?: "right" | "center";
  padding?: string;
  sameWidth?: boolean;
  customWidth?: number | string;
  customHeith?: number | string;
  marginTop?: number;
  flexDirection?: "row" | "column";
};

export default function DropDown({
  component,
  renderChildren,
  padding,
  customWidth = "fit-content",
  customHeith = "fit-content",
  marginTop = 0,
  sameWidth = false,
  flexDirection = "column",
  align,
}: Prop) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<Record<string, string | number>>({
    top: 0,
    left: 0,
    right: 0,
    width: 0,
  });
  const componentRef = useRef<HTMLElement | null>(null);
  const dropRef = useRef<HTMLDivElement | null>(null);

  const togleDropDown = () => {
    setIsOpen(!isOpen);
  };
  const openDropDown = () => {
    setIsOpen(true);
  };
  const closeDropDown = () => {
    setIsOpen(false);
  };

  const handleMouseDown = (e: MouseEvent) => {
    if (
      componentRef.current &&
      e.target instanceof Node &&
      !componentRef.current.contains(e.target) &&
      !dropRef.current?.contains(e.target)
    ) {
      togleDropDown();
    }
  };
  const adjustPosition = () => {
    if (!componentRef.current) return;
    const { top, left, right, height, width } =
      componentRef.current?.getBoundingClientRect();

    setPosition({
      top: top + height + window.scrollY,
      left: align === "center" ? left + width / 2 : left,
      width: sameWidth ? width : customWidth,
      right: align === "right" ? window.innerWidth - right : "",
    });
  };
  const handleScroll = () => {
    if (dropRef.current && componentRef.current) {
      const { top } = dropRef.current?.getBoundingClientRect();
      if (window.scrollY > top + window.scrollY) setIsOpen(false);
    }
  };

  useEffect(() => {
    adjustPosition();
    window.addEventListener("resize", adjustPosition);
    return () => window.removeEventListener("resize", adjustPosition);
  }, []);
  useEffect(() => {
    if (isOpen) {
      window.addEventListener("mousedown", handleMouseDown);
      window.addEventListener("scroll", handleScroll);
    } else {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("scroll", handleScroll);
    }
    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen]);
  return (
    <>
      {component(isOpen, componentRef, openDropDown, togleDropDown)}
      {isOpen && (
        <Portal>
          <Card
            ref={dropRef}
            type="floating"
            style={{
              padding: padding,
              width: position.width,
              height: customHeith,
              flexDirection: flexDirection,
              transform: align === "center" ? "translateX(-50%)" : "",
              marginTop: marginTop,
              top: position.top,
              left: position.left,
              right: position.right,
            }}
          >
            {renderChildren(closeDropDown)}
          </Card>
        </Portal>
      )}
    </>
  );
}

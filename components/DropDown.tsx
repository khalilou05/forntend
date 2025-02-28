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
  sameWidth?: boolean;
} & React.ComponentProps<"div">;

export default function DropDown({
  component,
  renderChildren,
  align,
  sameWidth = false,
  ...rest
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
  const firstOpen = useRef(false);

  const adjustPosition = () => {
    if (!componentRef.current) return;
    const { top, left, right, height, width } =
      componentRef.current?.getBoundingClientRect();

    setPosition({
      top: top + height + window.scrollY,
      left: align === "center" ? left + width / 2 : left,
      width: sameWidth ? width : rest.style?.width || "fit-content",
      right: align === "right" ? window.innerWidth - right : "",
    });
  };
  const togleDropDown = () => {
    adjustPosition();
    setIsOpen(!isOpen);
  };
  const openDropDown = () => {
    adjustPosition();
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

  const handleScroll = () => {
    if (dropRef.current) {
      const { top, height } = dropRef.current?.getBoundingClientRect();
      if (window.scrollY > top + window.scrollY) setIsOpen(false);

      // todo fix
      // console.log("top heigh", top + height);
      // console.log(window.innerHeight);
    }
  };

  useEffect(() => {
    if (!firstOpen.current) firstOpen.current = true;
    const abortctrl = new AbortController();
    if (isOpen) {
      window.addEventListener("mousedown", handleMouseDown, {
        signal: abortctrl.signal,
      });
      window.addEventListener("scroll", handleScroll, {
        signal: abortctrl.signal,
      });
    } else {
      abortctrl.abort();
    }
    return () => {
      abortctrl.abort();
    };
  }, [isOpen]);
  return (
    <>
      {component(isOpen, componentRef, openDropDown, togleDropDown)}

      <Portal>
        <Card
          ref={dropRef}
          type="floating"
          style={{
            ...rest.style,
            display: isOpen ? "block" : "none",
            width: position.width,
            transform: align === "center" ? "translateX(-50%)" : "",
            top: position.top,
            left: position.left,
            right: position.right,
            scrollbarWidth: "thin",
            overflow: "auto",
            maxHeight: "200px",
            zIndex: 120,
          }}
        >
          {firstOpen.current && renderChildren(closeDropDown)}
        </Card>
      </Portal>
    </>
  );
}

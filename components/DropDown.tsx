"use client";
import { useWarperRef } from "@/context/WarperRefCtx";
import dynamic from "next/dynamic";
import React, {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

const Portal = dynamic(() => import("./Portal"), { ssr: false });

type DropDownProps<T extends HTMLElement> = {
  component: (
    isOpen: boolean,
    ref: React.RefObject<T | null>,
    openDropDown: () => void,
    toggleDropDown: () => void
  ) => ReactNode;
  dropDown: (
    ref: React.RefObject<HTMLDivElement | null>,
    styles: CSSProperties,
    closeDropDown: () => void
  ) => ReactNode;

  align?: "left" | "center" | "right";
  sameWidth?: boolean;
  gap?: number;
};

export default function DropDown<T extends HTMLElement>({
  component,
  dropDown,

  align = "left",
  sameWidth = false,
  gap = 2,
}: DropDownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<CSSProperties>({
    top: 0,
    left: 0,
    width: "auto",
  });

  const componentRef = useRef<T | null>(null);
  const dropRef = useRef<HTMLDivElement | null>(null);
  const frameId = useRef<number | null>(null);
  const { warper } = useWarperRef();

  const updatePosition = () => {
    const trigger = componentRef.current;
    const dropdown = dropRef.current;
    if (!trigger || !dropdown) return;

    const triggerRect = trigger.getBoundingClientRect();
    const dropdownHeight = dropdown.offsetHeight;
    const triggerMid = triggerRect.left + triggerRect.width / 2;

    if (triggerRect.top <= 50 || triggerRect.bottom >= window.innerHeight) {
      closeDropDown();
      return;
    }

    const spaceBelow = window.innerHeight - triggerRect.bottom;
    const spaceAbove = triggerRect.top;
    const placeAbove =
      dropdownHeight > spaceBelow && spaceAbove > dropdownHeight;

    const top = placeAbove
      ? triggerRect.top - dropdownHeight - gap
      : triggerRect.bottom + gap;

    let left = triggerRect.left;
    if (align === "center") left = triggerMid;
    if (align === "right") left = triggerRect.right;

    setPosition({
      top,
      left,
      width: sameWidth ? triggerRect.width : "auto",
      transform:
        align === "center"
          ? "translateX(-50%)"
          : align === "right"
          ? "translateX(-100%)"
          : undefined,
    });
  };

  const initPosition = () => {
    if (!componentRef.current) return;
    const { top, height, left, width } =
      componentRef.current.getBoundingClientRect();
    setPosition({
      top: top + height + gap,
      left: left,
      width: sameWidth ? width : "auto",
    });
  };

  const openDropDown = () => {
    initPosition();
    setIsOpen(true);
  };
  const closeDropDown = () => setIsOpen(false);

  const toggleDropDown = () => {
    initPosition();
    setIsOpen(!isOpen);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (
      componentRef.current?.contains(e.target as Node) ||
      dropRef.current?.contains(e.target as Node)
    )
      return;

    closeDropDown();
  };

  const handleScrollResize = () => {
    if (frameId.current) cancelAnimationFrame(frameId.current);
    frameId.current = requestAnimationFrame(updatePosition);
  };

  useEffect(() => {
    if (!isOpen) return;
    const ctrl = new AbortController();
    window.addEventListener("mousedown", handleOutsideClick, {
      signal: ctrl.signal,
    });
    window.addEventListener("resize", handleScrollResize, {
      signal: ctrl.signal,
    });
    window.addEventListener("blur", closeDropDown, { signal: ctrl.signal });
    warper.current?.addEventListener("scroll", handleScrollResize, {
      signal: ctrl.signal,
    });

    return () => ctrl.abort();
  }, [isOpen]);

  return (
    <>
      {component(isOpen, componentRef, openDropDown, toggleDropDown)}
      <Portal>
        {dropDown(
          dropRef,
          {
            ...position,
            position: "absolute",
            visibility: isOpen ? "visible" : "hidden",
            zIndex: 120,
          },
          closeDropDown
        )}
      </Portal>
    </>
  );
}

import { useEffect, useRef, useState } from "react";
import Portal from "./Portal";
import style from "@/css/component/datePicker.module.css";
import CalendarIcon from "@/assets/icons/calendar";
export default function DatePicker() {
  const [dropDown, setDropDown] = useState({
    left: 0,
    top: 0,
    width: 0,
    visible: false,
  });
  const dropDownRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFocus = () => {
    if (inputRef.current) {
      const { top, left, height, width } =
        inputRef.current?.getBoundingClientRect();
      setDropDown({
        top: top + height,
        left: left,
        width: width,
        visible: true,
      });
    }
  };

  const handleClose = (e: MouseEvent) => {
    if (
      !dropDownRef.current?.contains(e.target as Node) &&
      !inputRef.current?.contains(e.target as Node)
    ) {
      setDropDown((prv) => ({ ...prv, visible: false }));
    }
  };

  useEffect(() => {
    if (dropDown.visible) {
      window.addEventListener("mousedown", handleClose);
    } else {
      window.removeEventListener("mousedown", handleClose);
    }
    return () => window.removeEventListener("mousedown", handleClose);
  }, [dropDown.visible]);
  return (
    <>
      <div className={style.warper}>
        <input
          readOnly
          ref={inputRef}
          onFocus={handleFocus}
          type="text"
        />
        <CalendarIcon
          height={20}
          width={20}
          color={"hsl(0,0%,50%)"}
        />
      </div>

      <Portal>
        <div
          className={style.dropDown}
          ref={dropDownRef}
          data-open={dropDown.visible}
          style={{
            visibility: dropDown.visible ? "visible" : "hidden",
            top: dropDown.top,
            left: dropDown.left,
            backgroundColor: "gray",
            width: dropDown.width,
            height: "100px",
          }}
        >
          sdfsdfsdf
        </div>
      </Portal>
    </>
  );
}

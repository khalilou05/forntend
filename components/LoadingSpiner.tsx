import style from "@/css/loiding.module.css";
import type React from "react";
type loadingProp = {
  size: number;
  borderTopColor?: string;
} & React.ComponentProps<"div">;
export default function LoadingSpiner({
  size,
  borderTopColor = "black",
  ...rest
}: loadingProp) {
  const border = (size * 10) / 100;

  return (
    <div
      style={{
        width: `${size}px`,
        borderRadius: "50%",
        aspectRatio: 1 / 1,
        border: `${border}px solid gray`,
        borderTopColor: borderTopColor,
        ...rest.style,
      }}
      className={style.loading + " " + rest.className}
    ></div>
  );
}

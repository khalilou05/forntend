import style from "@/css/component/loiding.module.css";
type loadingProp = {
  size: string;
  borderWidth?: string;
  borderTopColor?: string;
  borderColor?: string;
};
export default function Loading({ size, borderTopColor }: loadingProp) {
  const border = (Number(size.replace("px", "")) * 10) / 100;

  return (
    <div
      style={{
        width: size,
        borderRadius: "50%",
        aspectRatio: 1 / 1,
        border: `${border}px solid gray`,
        borderTopColor: borderTopColor ?? "black",
      }}
      className={style.loading}
    ></div>
  );
}

import style from "@/css/component/loiding.module.css";
type loadingProp = {
  size: number;
  borderWidth?: string;
  borderTopColor?: string;
  borderColor?: string;
};
export default function LoadingSpiner({
  size,
  borderTopColor = "black",
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
      }}
      className={style.loading}
    ></div>
  );
}

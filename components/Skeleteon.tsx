import style from "@/css/component/skeleton.module.css";

type LineProp = {
  lineNum: number;
} & React.ComponentProps<"div">;
export function LineSkeleteon({ lineNum, ...rest }: LineProp) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {Array.from({ length: lineNum }).map((_, i) => (
        <div
          {...rest}
          key={i}
          style={{ width: i + 1 === lineNum ? "60%" : "100%" }}
          className={style.line}
        ></div>
      ))}
    </div>
  );
}
type SquareProp = {
  width: number;
} & React.ComponentProps<"div">;
export function SquareSkeleteon({ width, ...rest }: SquareProp) {
  return (
    <div
      {...rest}
      className={style.square}
    ></div>
  );
}

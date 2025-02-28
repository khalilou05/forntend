import style from "@/css/component/skeleton.module.css";

type LineProp = {
  lineNum: number;
} & React.ComponentProps<"div">;
export function LineSkeleteon({ lineNum, ...rest }: LineProp) {
  let line = [];
  for (let index = 0; index < lineNum; index++) {
    line.push(
      <div
        {...rest}
        key={index}
        className={style.line}
      ></div>
    );
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {line}
    </div>
  );
}

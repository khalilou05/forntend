import AlertIco from "@/assets/icons/AlertTriangle";
import InfoIco from "@/assets/icons/info";
import type { JSX } from "react";
type Prop = {
  msg: string;
  icon?: "triangle" | "info";
};

export default function ErrorMsg({ msg, icon = "triangle" }: Prop) {
  const icons = new Map<string, JSX.Element>([
    ["triangle", <AlertIco fill="rgba(199, 10, 36, 1)" />],
    ["info", <InfoIco fill="rgba(199, 10, 36, 1)" />],
  ]);

  return (
    <div
      style={{
        color: "rgba(199, 10, 36, 1)	",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "5px",
      }}
    >
      {icons.get(icon)}
      {msg}
    </div>
  );
}

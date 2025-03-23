import AlertIco from "@/assets/icons/AlertTriangle";
type Prop = {
  msg: string;
};
export default function ErrorMsg({ msg }: Prop) {
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
      <AlertIco fill="rgba(199, 10, 36, 1)" />
      {msg}
    </div>
  );
}

import DownArrow from "@/assets/icons/caretDown";
interface Prop extends React.ComponentProps<"svg"> {}
function UpArrow({ ...rest }: Prop) {
  return (
    <DownArrow
      {...rest}
      style={{ rotate: "180deg" }}
    />
  );
}
export default UpArrow;

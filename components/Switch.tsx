import style from "@/css/component/switch.module.css";

export default function Switch({
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={style.switch}
      type="checkbox"
      {...rest}
    />
  );
}

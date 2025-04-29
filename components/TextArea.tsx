import style from "@/css/textarea.module.css";
export default function TextArea({
  ...rest
}: React.ComponentProps<"textarea">) {
  return (
    <textarea
      {...rest}
      className={style.textarea}
    ></textarea>
  );
}

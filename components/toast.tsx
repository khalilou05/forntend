import { createPortal } from "react-dom";

import style from "@/css/toast.module.css";
import { ToastMsg } from "@/types/types";
type Props = {
  data: { msg: string; type: string }[];
  setToastData: (ToastMsg: ToastMsg[]) => void;
};

function toastBox({ data }: Props) {
  return createPortal(
    <section className={style.wraper}>
      {data.map((toast) => (
        <div className={toast.type == "done" ? style.done : style.error}>
          {toast.msg}
        </div>
      ))}
    </section>,
    document.body
  );
}

export default toastBox;

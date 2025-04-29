import style from "@/css/badge.module.css";
import { orderStatusFormat } from "@/lib/ordertableFunc";
import type { OrderStatus } from "@/types/types";

type Prop = {
  status: Exclude<OrderStatus, "all">;
};
export default function Badge({ status }: Prop) {
  return <div className={style[status]}>{orderStatusFormat(status)}</div>;
}

import Card from "../Card";
import style from "@/css/route/add_order.module.css";

export default function OrderSummary() {
  return (
    <Card>
      <div className={style.title}>التفاصيل</div>
      <div className={style.sum_warper}>
        <div className={style.row_item}>
          <span>سعر الطلبية</span>
          <span>دج{}</span>
        </div>
        <div className={style.row_item}>
          <span>إضافة تخفيض</span>
          <span>--</span>
          <span>دج{}</span>
        </div>
        <div className={style.row_item}>
          <span>سعر التوصيل</span>
          <span>دج{}</span>
        </div>
        <div className={style.row_item}>
          <span className={style.total}>المجموع</span>
          <span className={style.total}>دج{}</span>
        </div>
      </div>
    </Card>
  );
}

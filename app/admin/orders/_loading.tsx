import Card from "@/components/Card";
import style from "@/css/skeleton/ordertable_ske.module.css";
export default function OrderTableSkeleton() {
  return (
    <div className={style.warper}>
      <div className={style.top_bar}>
        <div className={style.input}></div>
        <div className={style.button}></div>
      </div>
      <Card className={style.card}>
        <div className={style.statusBar}>
          <div className={style.status_btn}></div>
          <div className={style.status_btn}></div>
          <div className={style.status_btn}></div>
          <div className={style.status_btn}></div>
          <div className={style.status_btn}></div>
          <div className={style.status_btn}></div>
        </div>
        <div className={style.fixedRow}>
          <div className={style.rowItem}></div>
          <div className={style.rowItem}></div>
          <div className={style.rowItem}></div>
          <div className={style.rowItem}></div>
          <div className={style.rowItem}></div>
          <div className={style.rowItem}></div>
          <div className={style.rowItem}></div>
          <div className={style.rowItem}></div>
        </div>
        <div className={style.rowContainer}>
          <div className={style.rowItem}></div>
        </div>
      </Card>
    </div>
  );
}

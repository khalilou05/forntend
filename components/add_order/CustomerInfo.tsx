import Card from "@/components/Card";
import style from "@/css/component/customer_info.module.css";
import fetchApi from "@/lib/fetch";
import type { Baladiya, OrderOut, Wilaya } from "@/types/types";
import { useEffect, useState, type ChangeEvent } from "react";
import { Input } from "../inputGroup";
import SelectInput from "../SelectInput";

type Prop = {
  handleOrderData: (
    prop: keyof OrderOut,
    value: string | number | boolean
  ) => void;
};

export default function CustomerInfo({ handleOrderData }: Prop) {
  const [wilaya, setwilaya] = useState<Wilaya[]>([]);
  const [baladiya, setbaladiya] = useState<Baladiya[]>([]);
  const [selectedWilaya, setselectedWilaya] = useState<number>(0);

  const handleWilayaChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (Number(e.target.value) === 0) {
      setbaladiya([]);
    }
    setselectedWilaya(Number(e.target.value));
    handleOrderData("wilaya_id", Number(e.target.value));
  };

  useEffect(() => {
    if (selectedWilaya === 0) return;
    const controller = new AbortController();
    (async () => {
      const resp = await fetchApi<Baladiya[]>(`/baladiya/${selectedWilaya}`, {
        signal: controller.signal,
        cache: "force-cache",
      });
      if (resp?.status == 200 && resp.data) setbaladiya(resp.data);
    })();
    return () => controller.abort();
  }, [selectedWilaya]);

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      const resp = await fetchApi<Wilaya[]>("/wilaya?active=true", {
        signal: controller.signal,
        cache: "force-cache",
      });
      if (resp?.status == 200 && resp.data) setwilaya(resp.data);
    })();
    return () => controller.abort();
  }, []);
  return (
    <Card>
      <div className={style.title}>معلومات الزبون</div>
      <div className={style.card_body}>
        <div className={style.input_sec}>
          <label>الإسم الكامل</label>
          <Input
            type="text"
            onChange={(e) => handleOrderData("full_name", e.target.value)}
          />
        </div>
        <div className={style.input_sec}>
          <label>رقم الهاتف</label>
          <Input
            type="text"
            onChange={(e) => handleOrderData("phone_number", e.target.value)}
          />
        </div>
        <div className={style.input_sec}>
          <label>الولاية</label>

          <SelectInput onChange={handleWilayaChange}>
            <option value={0}>-- إختر ولاية --</option>
            {!!wilaya.length &&
              wilaya.map((wilaya) => (
                <option
                  value={wilaya.id}
                  key={wilaya.id}
                >
                  {wilaya.wilaya_code}-{wilaya.name}
                </option>
              ))}
          </SelectInput>
        </div>
        <div className={style.input_sec}>
          <label>البلدية</label>

          <SelectInput
            onChange={(e) => {
              handleOrderData("baladiya_id", Number(e.target.value));
            }}
          >
            <option value={0}>-- إختر بلدية --</option>
            {baladiya.map((item) => (
              <option
                value={item.id}
                key={item.id}
              >
                {item.name}
              </option>
            ))}
          </SelectInput>
        </div>
        <div className={style.input_sec}>
          <label>التوصيل</label>
          <SelectInput
            onChange={(e) => {
              handleOrderData("home_dilvery", !!e.target.value);
            }}
          >
            <option value={0}>للمكتب</option>
            <option value={1}>للمنزل</option>
          </SelectInput>
        </div>
      </div>
    </Card>
  );
}

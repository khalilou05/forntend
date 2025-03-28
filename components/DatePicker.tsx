import CalendarIco from "@/assets/icons/calendar";
import ArrowIco from "@/assets/icons/rightArrow";
import style from "@/css/component/datePicker.module.css";
import { useMemo, useState } from "react";
import DropDown from "./DropDown";
import Input from "./Input";

export default function DatePicker() {
  const [selectedDate, setSelectedDate] = useState(new Date(Date.now()));
  const [currentDate, setCurrentDate] = useState(new Date(Date.now()));

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const formatedMonth = new Intl.DateTimeFormat("ar-DZ", {
    month: "long",
    year: "numeric",
  }).format(currentDate);

  const setMonthUp = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentMonth + 1);
    setCurrentDate(newDate);
  };
  const setMonthDown = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentMonth - 1);
    setCurrentDate(newDate);
  };

  const getMonthDates = useMemo(() => {
    const dates = [];
    const date = new Date(currentYear, currentMonth, 1);
    while (date.getMonth() === currentMonth) {
      dates.push(date.getDate());
      date.setDate(date.getDate() + 1);
    }
    return dates;
  }, [currentMonth]);
  return (
    <DropDown
      sameWidth
      gap={5}
      component={(_, ref, __, togleDropDown) => (
        <div
          style={{
            display: "flex",
            width: "fit-content",
            position: "relative",
          }}
        >
          <Input
            ref={ref}
            value={Intl.DateTimeFormat("ar-DZ").format(selectedDate)}
            readOnly
            onClick={togleDropDown}
            style={{ cursor: "auto" }}
          />
          <CalendarIco
            fill="rgba(138, 138, 138, 1)"
            style={{
              position: "absolute",
              left: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              userSelect: "none",
              pointerEvents: "none",
            }}
            size={20}
          />
        </div>
      )}
      renderChildren={(closeDropDown) => (
        <div className={style.calendar}>
          <div className={style.header}>
            <button onClick={setMonthDown}>
              <ArrowIco size={20} />
            </button>
            {formatedMonth}
            <button onClick={setMonthUp}>
              <ArrowIco
                style={{ rotate: "180deg" }}
                size={20}
              />
            </button>
          </div>
          <div className={style.dateGrid}>
            {getMonthDates.map((day, i) => (
              <span
                className={style.date}
                key={i}
                onClick={() => {
                  setSelectedDate(new Date(currentYear, currentMonth, day));
                  closeDropDown();
                }}
              >
                {day}
              </span>
            ))}
          </div>
        </div>
      )}
    />
  );
}

import type { NotificationMsg } from "@/context/NotificationCtx";
import style from "@/css/notification.module.css";
import dynamic from "next/dynamic";
import { useEffect } from "react";
const Portal = dynamic(() => import("./Portal"), { ssr: false });

type Prop = {
  message: NotificationMsg[];
  popNotif: () => void;
};

export default function Notification({ message, popNotif }: Prop) {
  useEffect(() => {
    if (message.length === 0) return;
    const intervalId = setInterval(popNotif, 1000);

    return () => clearInterval(intervalId);
  }, [message]);
  return (
    <Portal>
      <div className={style.notification_box}>
        {message.map((item) => (
          <div
            key={item.id}
            className="style[item.type]"
          >
            {item.msg}
          </div>
        ))}
      </div>
    </Portal>
  );
}

import type { NotificationMsg } from "@/context/NotificationCtx";
import { useEffect } from "react";
import Portal from "./Portal";

type Prop = {
  message: NotificationMsg[];
  popNotif: () => void;
};

export default function Notification({ message, popNotif }: Prop) {
  useEffect(() => {
    const intervalId = setInterval(popNotif, 1000);

    return () => clearInterval(intervalId);
  }, [message]);
  return (
    <Portal>
      <div className="notification_box">
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

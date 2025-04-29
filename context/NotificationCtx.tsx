"use client";
import Notification from "@/components/Notification";
import { createContext, use, useCallback, useState } from "react";

type NotifCtx = {
  notify: (type: MsgType, message: string) => void;
};

const NotificationCtx = createContext<NotifCtx | null>(null);

type MsgType = "sucess" | "error" | "warning";

export type NotificationMsg = {
  id: string;
  type: MsgType;
  msg: string;
};

export default function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [msgQueue, setMsgQueue] = useState<NotificationMsg[]>([]);

  const notify = useCallback((type: MsgType, message: string) => {
    setMsgQueue((prv) => [
      ...prv,
      { id: crypto.randomUUID(), msg: message, type: type },
    ]);
  }, []);

  const popNotif = () => {
    setMsgQueue((prv) => {
      const newMsg = [...prv];
      newMsg.pop();
      return newMsg;
    });
  };
  return (
    <NotificationCtx value={{ notify }}>
      {children}
      <Notification
        message={msgQueue}
        popNotif={popNotif}
      />
    </NotificationCtx>
  );
}

export function useNotfication() {
  const NotfCtx = use(NotificationCtx);
  if (!NotfCtx) throw new Error("notification ctx is null");
  return NotfCtx;
}

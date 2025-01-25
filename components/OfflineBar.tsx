"use client";
import useIsOffline from "@/hooks/useIsOffline";
import style from "@/css/component/onlinebar.module.css";
import WifiOff from "@/assets/icons/wifiOff";
export default function OfflineBar() {
  const isOffline = useIsOffline();
  return (
    <>
      {isOffline && (
        <div className={style.bar}>
          غير متصل بالإنترنت
          <WifiOff size={20} />
        </div>
      )}
    </>
  );
}

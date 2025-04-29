import { Xicon } from "@/assets/icons";
import style from "@/css/modal.module.css";
import dynamic from "next/dynamic";
import { useEffect, useRef, type ComponentProps, type ReactNode } from "react";
import Button from "./Button";
const Portal = dynamic(() => import("./Portal"), { ssr: false });

interface Prop extends ComponentProps<"div"> {
  isOpen: boolean;
  backdrop?: boolean;
  animatedColse?: boolean;
  children: ReactNode;
  title: string;
  openModal?: () => void;
  closeModal: () => void;
  footerRender?: (handleClose: () => void) => ReactNode;
  component?: (handleOpen?: () => void) => ReactNode;
}
export default function Modal({
  isOpen,
  animatedColse = true,
  backdrop = false,
  children,
  title,
  footerRender,
  openModal,
  closeModal,
  component,
  ...rest
}: Prop) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      closeModal();
    }
  };

  const closemodal = () => {
    modalRef.current?.removeAttribute("open");
    if (animatedColse) {
      setTimeout(closeModal, 100);
    } else closeModal();
  };

  useEffect(() => {
    if (!isOpen) return;
    const abrtctrl = new AbortController();
    document.addEventListener("keydown", handleKeyDown, {
      signal: abrtctrl.signal,
    });
    return () => abrtctrl.abort();
  }, [isOpen]);

  return (
    <>
      <Portal>
        <div
          style={{ display: isOpen && backdrop ? "block" : "none" }}
          className={style.backDrop}
        ></div>
        <div
          className={style.dialog}
          style={{
            ...rest.style,
            display: isOpen ? "flex" : "none",
          }}
          ref={modalRef}
        >
          <div className={style.header}>
            {title}
            <Button
              buttonType="icon"
              className={style.close_btn}
              onClick={closemodal}
            >
              <Xicon />
            </Button>
          </div>
          {children}
          {footerRender && (
            <div className={style.footer}>{footerRender(closemodal)}</div>
          )}
        </div>
      </Portal>
      {component?.(openModal)}
    </>
  );
}

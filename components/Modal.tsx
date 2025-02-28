import React, {
  useEffect,
  useRef,
  type ReactNode,
  type ComponentProps,
} from "react";
import style from "@/css/component/modal.module.css";
import Xicon from "@/assets/icons/Xicon";
import Portal from "./Portal";

type Prop = {
  isOpen: boolean;
  backdrop?: boolean;
  animatedColse?: boolean;
  children: ReactNode;
  title: string;

  openModal?: () => void;
  closeModal: () => void;
  footerRender?: (handleClose: () => void) => ReactNode;
  render?: (handleOpen?: () => void) => ReactNode;
} & ComponentProps<"div">;
export default function Modal({
  isOpen,
  animatedColse = true,
  backdrop = false,
  children,
  title,
  footerRender,
  openModal,
  closeModal,
  render,
  ...rest
}: Prop) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      closeModal();
    }
  };

  const close = () => {
    modalRef.current?.removeAttribute("open");
    if (animatedColse) {
      setTimeout(closeModal, 100);
    } else closeModal();
  };

  useEffect(() => {
    const abortcontroller = new AbortController();
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown, {
        signal: abortcontroller.signal,
      });
      document.body.setAttribute("style", "height:100vh;overflow-y:hidden;");
    } else {
      abortcontroller.abort();
      document.body.removeAttribute("style");
    }
  }, [isOpen]);

  return (
    <>
      <Portal>
        <div
          style={{ display: isOpen && backdrop ? "block" : "none" }}
          className={style.backDrop}
        ></div>

        <div
          {...rest}
          className={style.dialog}
          style={{
            ...rest.style,
            display: isOpen ? "flex" : "none",
          }}
          ref={modalRef}
        >
          <div className={style.header}>
            {title}
            <button
              className={style.close_btn}
              onClick={close}
            >
              <Xicon size={20} />
            </button>
          </div>
          {children}
          {footerRender && (
            <div className={style.footer}> {footerRender(close)}</div>
          )}
        </div>
      </Portal>
      {render && render(openModal)}
    </>
  );
}

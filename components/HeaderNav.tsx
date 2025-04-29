"use client";
import RightArrowIcon from "@/assets/icons/rightArrow";
import style from "@/css/headerNav.module.css";
import { useRouter } from "next/navigation";

type Prop = {
  title: string;
};
export default function HeaderNav({ title }: Prop) {
  const router = useRouter();
  return (
    <div className={style.navBar}>
      <button
        className={style.arrowBtn}
        onClick={() => router.back()}
      >
        <span className={style.icon}>
          <RightArrowIcon size={20} />
        </span>
      </button>

      {title}
    </div>
  );
}

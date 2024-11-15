"use client";
import { useEffect, useRef, useState } from "react";

import style from "@/css/component/switch.module.css";
import MonnIcon from "../assets/aside_icons/moon.js";
import SunIcon from "../assets/aside_icons/sun.js";

function ThemTogle() {
  const [theme, settheme] = useState("light");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    const body = document.body;
    body?.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div
      onClick={() => {
        settheme((prv) => (prv == "light" ? "dark" : "light"));
        audioRef.current?.play();
      }}
      className={style.box}
    >
      <audio
        ref={audioRef}
        src="/switch-on.mp3"
      ></audio>

      {theme == "light" ? <MonnIcon size="20px" /> : <SunIcon size="20px" />}
    </div>
  );
}

export default ThemTogle;

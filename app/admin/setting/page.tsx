"use client";
import React, { useRef, useState } from "react";
import style from "@/css/route/setting.module.css";
import ReseTIcon from "@/assets/icons/resetPass";

import EyeOpen from "@/assets/icons/eyeOpen";
import EyeClose from "@/assets/icons/eyecrossed";
import { fetchApi } from "@/api/fetchApi";

type Setting = {
  [key: string]: string;
  username: string;
  password: string;
  confirmePassword: string;
};
function SettingPage() {
  const settingData = useRef({} as Setting);

  const [show, setshow] = useState(false);
  const [passError, setPassError] = useState(false);

  function handleCHange(field: keyof Setting, value: string) {
    if (settingData.current) {
      settingData.current[field] = value;
    }
  }

  function handleAdminInfoChange() {
    if (settingData.current.password !== settingData.current.confirmePassword) {
      setPassError(true);
      return;
    }
    fetchApi("/resetpassword", {
      method: "POST",
      body: JSON.stringify({
        username: settingData.current.username,
        password: settingData.current.password,
      }),
    });
  }

  return (
    <section className={style.card}>
      <div className={style.title}>
        <h1>تغير اسم المستخدم و كلمة السر</h1>
        <ReseTIcon
          color={"white"}
          size={"50px"}
        />
      </div>

      <section className={style.input_group}>
        <label htmlFor="username">إسم المستخدم</label>
        <input
          id="username"
          autoComplete="off"
          required
          onChange={(e) => handleCHange("username", e.target.value)}
          type="text"
        />

        <label htmlFor="password">كلمة السر</label>
        <input
          id="password"
          required
          autoComplete="off"
          onChange={(e) => handleCHange("password", e.target.value)}
          type={show ? "text" : "password"}
        />
        <div className={style.EyeIcon}>
          {show ? (
            <span onClick={() => setshow((prv) => !prv)}>
              <EyeClose size={"15px"} />
            </span>
          ) : (
            <span onClick={() => setshow((prv) => !prv)}>
              <EyeOpen size={"15px"} />
            </span>
          )}
        </div>

        <label htmlFor="confirmPassword">تأكيد كلمة السر</label>
        <input
          required
          id="confirmPassword"
          autoComplete="off"
          onChange={(e) => handleCHange("confirmePassword", e.target.value)}
          type={show ? "text" : "password"}
        />
        <button onClick={handleAdminInfoChange}>حفظ</button>
      </section>
    </section>
  );
}

export default SettingPage;

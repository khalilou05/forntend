"use client";

import { useRouter } from "next/navigation";
import { MouseEvent, useEffect, useRef, useState } from "react";
import style from "@/css/route/login.module.css";
import LockIcon from "@/assets/icons/lock.js";
import EyeCrossedIcon from "@/assets/icons/eyecrossed.js";
import EyeOpned from "@/assets/icons/eyeOpen.js";
import Loding from "@/components/Loding";

import { fetchApi } from "@/api/fetchApi";

function AdminLogin() {
  const loginData = useRef({
    username: "",
    password: "",
  });
  const [passEmpty, setPassEmpty] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [errorMsg, seterrorMsg] = useState("");

  const firstInpt = useRef<HTMLInputElement | null>(null);
  const passInpt = useRef<HTMLInputElement | null>(null);
  const route = useRouter();

  async function login(
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ): Promise<any> {
    event.preventDefault();

    if (firstInpt.current?.value == "") {
      firstInpt.current.focus();

      return;
    }
    if (passInpt.current?.value == "") {
      passInpt.current.focus();

      return;
    }
    try {
      setBtnLoading(true);
      const response = await fetchApi<string>("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData.current),
      });

      if (response?.status == 200) {
        route.push("/admin/orders");
      } else {
        throw new Error("failed");
      }
    } catch (error) {
      setLoginError(true);
    } finally {
      setTimeout(() => {
        setBtnLoading(false);
        setLoginError(false);
      }, 2000);
    }
  }

  useEffect(() => {
    firstInpt.current?.focus();
  }, []);

  return (
    <section className={style.wraper}>
      <form>
        <div className={style.top}>
          <h1>لوحة التحكم</h1>
          <LockIcon size={"30px"} />
        </div>

        <div className={style.main}>
          <div className={style.input}>
            <label htmlFor="username">إسم المستخدم</label>
            <input
              id="username"
              ref={firstInpt}
              tabIndex={1}
              type="text"
              autoComplete="off"
              required
              onChange={(e) => {
                loginData.current.username = e.target.value;
              }}
            />
          </div>

          <div className={style.input}>
            <label htmlFor="password">كلمة السر</label>
            <input
              tabIndex={2}
              id="password"
              autoComplete="off"
              type={showPassword ? "text" : "password"}
              ref={passInpt}
              required
              onChange={(e) => {
                loginData.current.password = e.target.value;
                if (loginData.current.password == "") {
                  setPassEmpty(true);
                  return;
                }
                setPassEmpty(false);
              }}
            />
            <span
              className={style.eyeIcon}
              style={{
                visibility: passEmpty ? "hidden" : "visible",
              }}
              onClick={() => setShowPassword((prv) => !prv)}
            >
              {showPassword ? (
                <EyeCrossedIcon size={"15px"} />
              ) : (
                <EyeOpned size={"15px"} />
              )}
            </span>
          </div>

          <button
            disabled={btnLoading}
            tabIndex={3}
            type="submit"
            onClick={login}
          >
            {btnLoading ? (
              <Loding borderTopColor="white" size="25px" />
            ) : (
              "دخول"
            )}
          </button>
          {loginError && (
            <span className={style.error_msg}>
              إسم المستخدم أو كلمة السر خاطئة
            </span>
          )}
        </div>
      </form>
    </section>
  );
}

export default AdminLogin;

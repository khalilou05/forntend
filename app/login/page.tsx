"use client";

import { useRouter } from "next/navigation";
import { MouseEvent, useEffect, useRef, useState } from "react";
import style from "@/css/route/login.module.css";
import LockIcon from "@/assets/icons/lock";
import EyeCrossedIcon from "@/assets/icons/eyecrossed";
import EyeOpned from "@/assets/icons/eyeOpen";
import Loding from "@/components/LoadingSpiner";

import Card from "@/components/Card";
import Input from "@/components/Input";
import Button from "@/components/Button";
import fetchApi from "@/lib/fetch";

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
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
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
      const response = await fetchApi("/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData.current),
      });

      if (response?.status === 200) {
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
    <Card
      style={{
        height: 400,
        width: 350,
        position: "absolute",
        inset: 0,
        margin: "auto",
        padding: "0px 20px",
      }}
    >
      <form>
        <div className={style.top}>
          <h1>لوحة التحكم</h1>
          <LockIcon size={60} />
        </div>

        <div className={style.main}>
          <div className={style.section}>
            <label>إسم المستخدم</label>
            <Input
              style={{ height: "40px" }}
              ref={firstInpt}
              onChange={(e) => {
                loginData.current.username = e.target.value;
              }}
            />
          </div>

          <div className={style.section}>
            <label htmlFor="password">كلمة السر</label>
            <div className={style.passwordInput}>
              <Input
                type={showPassword ? "text" : "password"}
                style={{ height: "40px" }}
                onChange={(e) => {
                  loginData.current.password = e.target.value;
                  if (loginData.current.password == "") {
                    setPassEmpty(true);
                    return;
                  }
                  setPassEmpty(false);
                }}
              />

              {showPassword ? (
                <EyeCrossedIcon
                  onClick={() => setShowPassword((prv) => !prv)}
                  size={15}
                />
              ) : (
                <EyeOpned
                  onClick={() => setShowPassword((prv) => !prv)}
                  size={15}
                  style={{
                    visibility: passEmpty ? "hidden" : "visible",
                  }}
                />
              )}
            </div>
          </div>

          <Button
            style={{ width: "auto", height: "40px" }}
            buttonType="primary"
            disabled={btnLoading}
            onClick={login}
          >
            {btnLoading ? (
              <Loding
                borderTopColor="white"
                size={25}
              />
            ) : (
              "دخول"
            )}
          </Button>
          {loginError && (
            <span className={style.error_msg}>
              إسم المستخدم أو كلمة السر خاطئة
            </span>
          )}
        </div>
      </form>
    </Card>
  );
}

export default AdminLogin;

"use client";

import React, { createContext, use, useRef, type RefObject } from "react";
type CtxProp = {
  warper: RefObject<HTMLDivElement | null>;
};

const AdminMainCtx = createContext<CtxProp | null>(null);

function MainWarperProvider({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);
  return (
    <AdminMainCtx value={{ warper: ref }}>
      <div
        ref={ref}
        className="page"
      >
        {children}
      </div>
    </AdminMainCtx>
  );
}
export default MainWarperProvider;

export function useWarperRef() {
  const ctx = use(AdminMainCtx);
  if (!ctx) throw new Error("ctx is null");
  return ctx;
}

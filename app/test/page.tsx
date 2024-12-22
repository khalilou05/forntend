"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

export default function Page() {
  useEffect(() => {
    const hey = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      console.log(e);
    };
    window.addEventListener("beforeunload", hey);

    return () => window.removeEventListener("beforeunload", hey);
  }, []);

  return (
    <div>
      <Link href={"/admin/orders"}>qsdqsd</Link>
    </div>
  );
}

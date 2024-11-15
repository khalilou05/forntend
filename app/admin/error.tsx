"use client";
import React from "react";

type ErrorPageProp = {
  Error: Error;
  reset: () => void;
};

function Error({ Error, reset }: ErrorPageProp) {
  return (
    <div>
      حدث خطأ
      <button onClick={reset}></button>
    </div>
  );
}

export default Error;

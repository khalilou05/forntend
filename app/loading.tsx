import React from "react";
import LoadingIco from "@/components/Loding";
function Loading() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        margin: "auto auto",
        width: "fit-content",
        height: "fit-content",
      }}
    >
      <LoadingIco size="50px" />
    </div>
  );
}

export default Loading;

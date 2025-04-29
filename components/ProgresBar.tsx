"use client";
import { useState } from "react";
export default function ProgresBar() {
  const [value, setValue] = useState(0);

  // useEffect(() => {
  //   let id = setInterval(() => {
  //     setValue((prv) => {
  //       if (prv >= 100) return 100;
  //       return prv + Math.random() * 10;
  //     });
  //   }, 500);

  //   return () => {
  //     clearInterval(id);
  //   };
  // }, []);
  return (
    <div>loading</div>
    // <div
    //   style={{
    //     width: `${value}%`,
    //     height: "2px",
    //     backgroundColor: "red",
    //     position: "fixed",
    //     top: 0,
    //     left: 0,
    //     transition: "width 100ms",
    //   }}
    // ></div>
  );
}

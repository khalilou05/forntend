import * as React from "react";
const SvgComponent = ({ size }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 30 30"
    width={size}
    height={size}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20.63 20a9 9 0 0 1-9.12-8.78A8.61 8.61 0 0 1 14.17 5 10.17 10.17 0 0 0 5 15a10.23 10.23 0 0 0 10.42 10A10.43 10.43 0 0 0 25 18.9a9.3 9.3 0 0 1-4.37 1.1Z"
    />
  </svg>
);
export default SvgComponent;

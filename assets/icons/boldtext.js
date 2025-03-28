import * as React from "react";
const SvgComponent = ({ size }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    height={size}
    width={size}
  >
    <path
      fillRule="evenodd"
      d="M7 3c-.83 0-1.5.67-1.5 1.5v10.46c0 .85.69 1.54 1.54 1.54h4.46a4 4 0 0 0 2.32-7.26 4 4 0 0 0-3.32-6.24h-3.5Zm3.5 5.5a1.5 1.5 0 0 0 0-3h-2.5v3h2.5Zm-2.5 2.5v3h3.5a1.5 1.5 0 0 0 0-3h-3.5Z"
    />
  </svg>
);
export default SvgComponent;

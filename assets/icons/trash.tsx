import * as React from "react";
type Prop = {
  size?: number;
} & React.SVGProps<SVGSVGElement>;
const SvgComponent = ({ size, ...rest }: Prop) => (
  <svg
    {...rest}
    xmlns="http://www.w3.org/2000/svg"
    height={size}
    width={size}
    viewBox={`0 0 ${size} ${size}`}>
    <g>
      <path d="M21 4h-3.1A5.009 5.009 0 0 0 13 0h-2a5.009 5.009 0 0 0-4.9 4H3a1 1 0 0 0 0 2h1v13a5.006 5.006 0 0 0 5 5h6a5.006 5.006 0 0 0 5-5V6h1a1 1 0 0 0 0-2ZM11 2h2a3.006 3.006 0 0 1 2.829 2H8.171A3.006 3.006 0 0 1 11 2Zm7 17a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3V6h12Z" />
      <path d="M10 18a1 1 0 0 0 1-1v-6a1 1 0 0 0-2 0v6a1 1 0 0 0 1 1ZM14 18a1 1 0 0 0 1-1v-6a1 1 0 0 0-2 0v6a1 1 0 0 0 1 1Z" />
    </g>
  </svg>
);
export default SvgComponent;

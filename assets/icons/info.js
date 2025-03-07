const SvgComponent = ({ size }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    height={size}
    width={size}
  >
    <path d="M10 14a.75.75 0 0 1-.75-.75v-3.5a.75.75 0 0 1 1.5 0v3.5a.75.75 0 0 1-.75.75Z" />
    <path d="M9 7a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z" />
    <path
      fillRule="evenodd"
      d="M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Zm-1.5 0a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0Z"
    />
  </svg>
);
export default SvgComponent;

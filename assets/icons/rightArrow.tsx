type Prop = {
  size: number;
} & React.ComponentProps<"svg">;

const SvgComponent = ({ size, ...rest }: Prop) => (
  <svg
    {...rest}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    height={size}
    width={size}
  >
    <path
      fillRule="evenodd"
      d="M3.5 10a.75.75 0 0 1 .75-.75h9.69l-2.72-2.72a.75.75 0 1 1 1.06-1.06l4 4a.75.75 0 0 1 0 1.06l-4 4a.75.75 0 0 1-1.06-1.06l2.72-2.72h-9.69a.75.75 0 0 1-.75-.75Z"
    />
  </svg>
);
export default SvgComponent;

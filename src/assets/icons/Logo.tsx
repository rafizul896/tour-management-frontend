type LogoProps = {
  width?: number;
  height?: number;
  name?: boolean;
};

export default function Logo({ width = 50, height = 32, name=false }: LogoProps) {
  return (
    <div className="flex items-center gap-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 50 39"
        fill="none"
        id="Logo"
      >
        <g id="logomark">
          <path
            d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
            fill="#FDBA74"
          />
          <g id="shadow">
            <path
              d="M17.4231 27.1022L11.4199 36.0002H33.5015L49.0007 13.0273H32.7031L23.2071 27.1022H17.4231Z"
              fill="#F97316"
            />
          </g>
        </g>
      </svg>
      {name && <h1 className="font-semibold text-lg">Explore<span className="text-primary">Bangla</span></h1>}
    </div>
  );
}

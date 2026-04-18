interface LDLogoProps {
  className?: string;
  size?: number;
  variant?: "light" | "dark" | "gold";
}

export default function LDLogo({
  className = "",
  size = 80,
  variant = "light",
}: LDLogoProps) {
  const circleColor =
    variant === "gold"
      ? "#c9a84c"
      : variant === "light"
      ? "#ffffff"
      : "#0a0a0a";
  const textColor =
    variant === "gold"
      ? "#0a0a0a"
      : variant === "light"
      ? "#0a0a0a"
      : "#ffffff";
  const labelColor =
    variant === "gold"
      ? "#0a0a0a"
      : variant === "light"
      ? "#6b6b6b"
      : "#6b6b6b";

  return (
    <svg
      width={size}
      height={size * 1.15}
      viewBox="0 0 100 115"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="LD Watches"
    >
      <circle cx="50" cy="46" r="44" fill={circleColor} />
      <text
        x="50"
        y="62"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontWeight="700"
        fontSize="38"
        fill={textColor}
        textAnchor="middle"
        letterSpacing="-1"
      >
        LD
      </text>
      <text
        x="50"
        y="104"
        fontFamily="Georgia, serif"
        fontWeight="400"
        fontSize="9"
        fill={labelColor}
        textAnchor="middle"
        letterSpacing="4"
      >
        WATCHES
      </text>
    </svg>
  );
}

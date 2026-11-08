import ThemedImage from "./ThemedImage";

type LogoProps = {
  className?: string;
  width: number;
  height: number;
  decorative?: boolean;
  loading?: "lazy" | "eager";
};

const Logo = ({ decorative = true, ...rest }: LogoProps) => (
  <ThemedImage
    light="/images/logo_light.svg"
    dark="/images/logo_dark.svg"
    alt={decorative ? "" : "4D Detailing"}
    {...rest}
  />
);

export default Logo;

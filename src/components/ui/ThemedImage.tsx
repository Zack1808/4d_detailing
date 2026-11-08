import type { ImgHTMLAttributes } from "react";

type ThemedImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  light: string;
  dark: string;
};

const ThemedImage = ({ light, dark, alt = "", ...rest }: ThemedImageProps) => (
  <picture>
    <source media="(prefers-color-scheme: dark)" srcSet={dark} />
    <img src={light} alt={alt} {...rest} />
  </picture>
);

export default ThemedImage;

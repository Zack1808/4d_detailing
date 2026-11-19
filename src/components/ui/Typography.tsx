import type { ReactNode } from "react";

import { cn } from "../../utils/cn";

type TextProps = { children: ReactNode; className?: string; id?: string };

export const PageTitle = ({ children, className }: TextProps) => (
  <h1 className={cn("mt-30 text-4xl font-bold", className)}>{children}</h1>
);

export const SectionTitle = ({ children, className, id }: TextProps) => (
  <h2 id={id} className={cn("text-4xl font-bold", className)}>
    {children}
  </h2>
);

export const SubTitle = ({
  children,
  className,
  as: Tag = "h3",
}: TextProps & { as?: "h2" | "h3" }) => (
  <Tag className={cn("text-2xl font-semibold", className)}>{children}</Tag>
);

export const Paragraph = ({ children, className }: TextProps) => (
  <p className={cn("max-w-[85ch] font-light", className)}>{children}</p>
);

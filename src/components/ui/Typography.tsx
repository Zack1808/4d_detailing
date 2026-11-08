import type { ReactNode } from "react";

import { cn } from "../../utils/cn";

type TextProps = { children: ReactNode; className?: string };

export const PageTitle = ({ children, className }: TextProps) => (
  <h1 className={cn("mt-30 text-4xl font-bold", className)}>{children}</h1>
);

export const SectionTitle = ({ children, className }: TextProps) => (
  <h2 className={cn("text-4xl font-bold", className)}>{children}</h2>
);

export const SubTitle = ({ children, className }: TextProps) => (
  <h3 className={cn("text-2xl font-semibold", className)}>{children}</h3>
);

export const Paragraph = ({ children, className }: TextProps) => (
  <p className={cn("max-w-[85ch] font-light", className)}>{children}</p>
);

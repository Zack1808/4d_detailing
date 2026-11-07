import type { ReactNode } from "react";

import { cn } from "../../utils/cn";

type PopoverProps = {
  dropUp: boolean;
  onDismiss: () => void;
  className?: string;
  children: ReactNode;
};

const Popover = ({ dropUp, onDismiss, className, children }: PopoverProps) => (
  <div
    className={cn(
      "fixed inset-0 z-50 flex items-center justify-center bg-gray-dark/15 p-3 backdrop-blur-lg dark:bg-light/15",
      "md:absolute md:inset-auto md:w-full md:bg-light md:p-0 md:shadow-2xl md:backdrop-blur-none md:dark:bg-dark md:dark:shadow-light/10",
      dropUp ? "md:bottom-full md:mb-1" : "md:top-full md:mt-1",
      className,
    )}
    onClick={(event) => event.target === event.currentTarget && onDismiss()}
  >
    {children}
  </div>
);

export default Popover;

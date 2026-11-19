import type { ReactNode } from "react";
import { createPortal } from "react-dom";

import { useMediaQuery } from "../../hooks/useMediaQuery";
import { cn } from "../../utils/cn";

export const POPOVER_PORTAL_ATTR = "data-popover-portal";

type PopoverProps = {
  dropUp: boolean;
  onDismiss: () => void;
  className?: string;
  children: ReactNode;
};

const Popover = ({ dropUp, onDismiss, className, children }: PopoverProps) => {
  const isDesktop = useMediaQuery("(min-width: 48rem)");

  const content = (
    <div
      {...{ [POPOVER_PORTAL_ATTR]: "" }}
      className={cn(
        "fixed inset-0 z-70 flex items-center justify-center bg-gray-dark/15 p-3 backdrop-blur-lg dark:bg-light/15",
        "md:absolute md:inset-auto md:z-50 md:w-full md:bg-light md:p-0 md:shadow-2xl md:backdrop-blur-none md:dark:bg-dark md:dark:shadow-light/10",
        dropUp ? "md:bottom-full md:mb-1" : "md:top-full md:mt-1",
        className,
      )}
      onClick={(event) => event.target === event.currentTarget && onDismiss()}
    >
      {children}
    </div>
  );
  return isDesktop ? content : createPortal(content, document.body);
};

export default Popover;

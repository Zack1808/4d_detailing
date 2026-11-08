import { useId, useRef, type ReactNode } from "react";
import { FaX } from "react-icons/fa6";

import Button from "./Button";

import { useBodyScrollLock } from "../../hooks/useBodyScrollLock";
import { useFocusTrap } from "../../hooks/useFocusTrap";
import { useTransitionMount } from "../../hooks/useTransitionMount";

import { cn } from "../../utils/cn";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
};

const Modal = ({ open, onClose, title, children }: ModalProps) => {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  const { mounted, visible } = useTransitionMount(open, 250);

  useBodyScrollLock(mounted);
  useFocusTrap(panelRef, mounted && open, onClose);

  if (!mounted) return null;

  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div
        className={cn(
          "absolute inset-0 bg-gray-dark/15 backdrop-blur-lg transition-opacity duration-200 dark:bg-light/15",
          visible ? "opacity-100" : "opacity-0",
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        tabIndex={-1}
        className={cn(
          "relative z-10 max-h-[calc(100svh-2rem)] w-full max-w-3xl overflow-y-auto rounded-xs bg-light shadow-sm transition duration-200 ease-out dark:bg-dark",
          visible
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-4 scale-95 opacity-0",
        )}
      >
        <div className="bg-gray-light/20 p-6 dark:bg-gray-dark/20">
          <header className="flex w-full items-center justify-between gap-3">
            <h2 id={titleId} className="text-2xl font-normal">
              {title}
            </h2>

            <Button
              variant="none"
              className="text-2xl"
              onClick={onClose}
              aria-label="Zatvori"
            >
              <FaX aria-hidden="true" />
            </Button>
          </header>

          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

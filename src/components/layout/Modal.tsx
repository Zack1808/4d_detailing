import React, { useEffect, useRef, useState } from "react";
import { FaX } from "react-icons/fa6";
import Button from "../common/Button";

type ModalProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  children: React.ReactNode;
  title: string;
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  setIsOpen,
  children,
  title,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current =
        document.activeElement as HTMLElement | null;

      setShowModal(true);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsVisible(true);
        });
      });
    } else {
      setIsVisible(false);

      const timer = setTimeout(() => {
        setShowModal(false);

        previousActiveElement.current?.focus();
        previousActiveElement.current = null;
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !showModal) return;

    const modal = modalRef.current;
    if (!modal) return;

    const getFocusableElements = () => {
      return Array.from(
        modal.querySelectorAll<HTMLElement>(
          `
          a[href],
          button:not([disabled]),
          textarea:not([disabled]),
          input:not([disabled]),
          select:not([disabled]),
          [tabindex]:not([tabindex="-1"])
          `,
        ),
      ).filter(
        (element) =>
          !element.hasAttribute("disabled") &&
          element.getAttribute("aria-hidden") !== "true",
      );
    };

    const focusableElements = getFocusableElements();

    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    } else {
      modal.focus();
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        return;
      }

      if (event.key !== "Tab") return;

      const elements = getFocusableElements();

      if (elements.length === 0) {
        event.preventDefault();
        return;
      }

      const firstElement = elements[0];
      const lastElement = elements[elements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
        return;
      }

      if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, showModal, setIsOpen]);

  if (!showModal) {
    return null;
  }

  return (
    <div
      className={`
        fixed inset-0 z-45
        flex items-center justify-center
        p-4
        transition-opacity duration-50
        ${isVisible ? "opacity-100" : "opacity-0 delay-50"}
      `}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className={`
          absolute inset-0
          bg-gray-dark/15 dark:bg-light/15
          backdrop-blur-lg
          transition-opacity duration-50
          ${isVisible ? "opacity-100" : "opacity-0"}
        `}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      <div
        ref={modalRef}
        className={`
          relative z-10
          w-full max-w-3xl
          rounded-xs
          bg-light dark:bg-dark
          shadow-sm
          transition-all duration-100 ease-out
          ${
            isVisible
              ? "translate-y-0 scale-100 opacity-100 delay-100"
              : "translate-y-4 scale-95 opacity-0"
          }
        `}
        tabIndex={-1}
      >
        <div className="bg-gray-light/20 dark:bg-gray-dark/20 p-6">
          <header className="flex w-full justify-between items-center">
            <h6
              id="modal-title"
              className="text-dark dark:text-light font-semibold text-2xl"
            >
              {title}
            </h6>

            <Button
              variant="none"
              className="text-2xl"
              onClick={() => setIsOpen(false)}
            >
              <FaX />
            </Button>
          </header>

          <main>{children}</main>
        </div>
      </div>
    </div>
  );
};

export default Modal;

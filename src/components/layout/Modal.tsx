import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    if (isOpen) {
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
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, setIsOpen]);

  if (!showModal) {
    return null;
  }

  return (
    <div
      className={`
        fixed inset-0 z-45
        flex items-center justify-center
        p-4
        transition-opacity duration-300
        ${isVisible ? "opacity-100" : "opacity-0 delay-100"}
      `}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`
          absolute inset-0
          bg-gray-dark/15 dark:bg-light/15
          backdrop-blur-lg
          transition-opacity duration-300
          ${isVisible ? "opacity-100" : "opacity-0"}
        `}
        onClick={() => setIsOpen(false)}
      />

      <div
        className={`
          relative z-10
          w-full max-w-3xl
          rounded-sm
          bg-light dark:bg-dark
          shadow-sm
          transition-all duration-100 ease-out
          ${
            isVisible
              ? "translate-y-0 scale-100 opacity-100 delay-200"
              : "translate-y-4 scale-95 opacity-0"
          }
        `}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="bg-gray-light/20 dark:bg-gray-dark/20 p-6">
          <header className="flex w-full justify-between">
            <h6 className="text-dark dark:text-light font-semibold text-xl">
              {title}
            </h6>
            <Button variant="none" onClick={() => setIsOpen(false)}>
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

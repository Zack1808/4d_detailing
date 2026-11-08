import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

import Popover from "./Popover";
import { FIELD_BASE, POPOVER_PANEL, fieldBorder } from "./fieldStyles";

import { useClickOutside } from "../../hooks/useClickOutside";
import { usePopoverPlacement } from "../../hooks/usePopoverPlacement";

import { cn } from "../../utils/cn";
import { normalizeText } from "../../utils/text";

export type SelectOption = {
  value: string;
  label: string;
};

type SelectProps = {
  id: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  invalid?: boolean;
  className?: string;
  "aria-label"?: string;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
};

const TYPEAHEAD_RESET_MS = 600;

const Select = ({
  id,
  options,
  value,
  onChange,
  onBlur,
  name,
  placeholder = "Odaberite...",
  disabled = false,
  invalid,
  className,
  ...aria
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const typed = useRef({ text: "", timer: 0 });

  const listboxId = `${id}-listbox`;
  const optionId = (index: number) => `${id}-option-${index}`;

  const selectedIndex = options.findIndex((option) => option.value === value);
  const selectedOption = options[selectedIndex];

  const dropUp = usePopoverPlacement(rootRef, listRef, isOpen);

  const close = () => setIsOpen(false);

  useClickOutside(rootRef, close, isOpen);

  useEffect(() => {
    if (isOpen) {
      document
        .getElementById(optionId(activeIndex))
        ?.scrollIntoView({ block: "nearest" });
    }
  });

  const open = () => {
    if (disabled) return;

    setActiveIndex(Math.max(selectedIndex, 0));
    setIsOpen(true);
  };

  const choose = (index: number) => {
    const option = options[index];

    if (!option) return;

    onChange(option.value);
    close();
    buttonRef.current?.focus();
  };

  const moveTo = (index: number) =>
    setActiveIndex(Math.min(Math.max(index, 0), options.length - 1));

  const handleTypeahead = (character: string) => {
    window.clearTimeout(typed.current.timer);
    typed.current.text += normalizeText(character);
    typed.current.timer = window.setTimeout(() => {
      typed.current.text = "";
    }, TYPEAHEAD_RESET_MS);

    const match = options.findIndex((option) =>
      normalizeText(option.label).startsWith(typed.current.text),
    );

    if (match === -1) return;

    if (!isOpen) setIsOpen(true);

    setActiveIndex(match);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;

    switch (event.key) {
      case "ArrowDown":
      case "ArrowUp": {
        event.preventDefault();

        if (!isOpen) open();
        else moveTo(activeIndex + (event.key === "ArrowDown" ? 1 : -1));
        break;
      }

      case "Home":
      case "End":
        if (!isOpen) return;

        event.preventDefault();
        moveTo(event.key === "Home" ? 0 : options.length - 1);
        break;

      case "Enter":
      case " ":
        if (event.key === " " && typed.current.text) {
          event.preventDefault();
          handleTypeahead(" ");
          break;
        }

        event.preventDefault();

        if (isOpen) choose(activeIndex);
        else open();
        break;

      case "Escape":
        if (!isOpen) return;

        event.preventDefault();
        close();
        break;

      case "Tab":
        if (isOpen) close();
        break;

      default:
        if (event.key.length === 1 && !event.ctrlKey && !event.metaKey) {
          handleTypeahead(event.key);
        }
    }
  };

  return (
    <div ref={rootRef} className={cn("relative w-full", className)}>
      {name && <input type="hidden" name={name} value={value} />}

      <button
        ref={buttonRef}
        id={id}
        type="button"
        role="combobox"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={isOpen ? listboxId : undefined}
        aria-activedescendant={isOpen ? optionId(activeIndex) : undefined}
        onClick={() => (isOpen ? close() : open())}
        onKeyDown={handleKeyDown}
        onBlur={onBlur}
        className={cn(
          FIELD_BASE,
          fieldBorder(invalid),
          "flex min-h-10 cursor-pointer items-center justify-between gap-3 text-left disabled:cursor-not-allowed disabled:opacity-60",
        )}
        {...aria}
      >
        <span className="min-w-0 flex-1">
          {selectedOption ? (
            selectedOption.label
          ) : (
            <span className="font-light text-gray-light">{placeholder}</span>
          )}
        </span>
        {isOpen ? (
          <FaChevronUp aria-hidden="true" />
        ) : (
          <FaChevronDown aria-hidden="true" />
        )}
      </button>

      {isOpen && (
        <Popover dropUp={dropUp} onDismiss={close} className="md:max-h-62">
          <div
            id={listboxId}
            ref={listRef}
            role="listbox"
            aria-labelledby={`${id}-label`}
            onMouseDown={(event) => event.preventDefault()}
            className={cn(
              POPOVER_PANEL,
              "max-h-96 overflow-auto outline-none md:max-h-62",
            )}
          >
            {options.map((option, index) => (
              <div
                key={option.value}
                id={optionId(index)}
                role="option"
                aria-selected={option.value === value}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => choose(index)}
                className={cn(
                  "flex min-h-9 cursor-pointer select-none items-center gap-3 rounded-xs p-3 font-light",
                  index === activeIndex &&
                    "bg-gray-dark/20 dark:bg-gray-light/20",
                  option.value === value &&
                    "bg-gray-dark/40 font-normal dark:bg-gray-light/40",
                )}
              >
                {option.label}
              </div>
            ))}
          </div>
        </Popover>
      )}
    </div>
  );
};

export default Select;

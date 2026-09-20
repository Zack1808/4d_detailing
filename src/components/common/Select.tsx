import React, {
  useMemo,
  useState,
  useRef,
  useCallback,
  useEffect,
} from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

type SelectOptionType = {
  value: string;
  label: string;
};

type SelectProps = Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  "value" | "defaultValue" | "onChange" | "multiple"
> & {
  options: SelectOptionType[];
  multiple?: boolean;
  defaultValue?: string | string[];
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  placeholder?: string;
};

const getInitialValues = (
  defaultValue: string | string[] | undefined,
  multiple: boolean,
) => {
  if (multiple)
    return Array.isArray(defaultValue)
      ? defaultValue
      : defaultValue
        ? [defaultValue]
        : [];

  if (Array.isArray(defaultValue)) return defaultValue.slice(0, 1);

  return defaultValue ? [defaultValue] : [];
};

const Select: React.FC<SelectProps> = ({
  id,
  name,
  options,
  placeholder = "Select...",
  disabled = false,
  required = false,
  className = "",
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  multiple = false,
  value,
  onChange,
  defaultValue,
}) => {
  const initialValues = useMemo(
    () => getInitialValues(defaultValue, multiple),
    [],
  );

  const [internalSelected, setInternalSelected] =
    useState<string[]>(initialValues);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hasSpaceBelow, setHasSpaceBelow] = useState<boolean>(true);

  const isControlled = value !== undefined;

  const selected = isControlled
    ? Array.isArray(value)
      ? value
      : value
        ? [value]
        : []
    : internalSelected;

  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropDownRef = useRef<HTMLDivElement>(null);

  const listboxId = `${id}-listbox`;

  const checkSpace = useCallback(() => {
    if (!rootRef.current || !dropDownRef.current) return;

    const rootRect = rootRef.current.getBoundingClientRect();
    const dropDownHeight = dropDownRef.current.offsetHeight;

    const availableSpace = window.innerHeight - rootRect.bottom;

    setHasSpaceBelow(dropDownHeight < availableSpace);
  }, []);

  const selectedOptions = useMemo(
    () => options.filter((option) => selected.includes(option.value)),
    [selected, options],
  );

  const activeOption = useMemo(
    () => (activeIndex !== null ? options[activeIndex] : null),
    [activeIndex, options],
  );

  const isSelected = useCallback(
    (value: string) => selected.includes(value),
    [selected],
  );

  const updateSelected = useCallback(
    (next: string[]) => {
      if (!isControlled) {
        setInternalSelected(next);
      }

      if (multiple) {
        onChange?.(next);
      } else {
        onChange?.(next[0] ?? "");
      }
    },
    [isControlled, multiple, onChange],
  );

  const selectValue = useCallback(
    (value: string) => {
      const option = options.find((option) => option.value === value);

      if (!option) {
        return;
      }

      if (multiple) {
        const next = selected.includes(value)
          ? selected.filter((item) => item !== value)
          : [...selected, value];

        updateSelected(next);
        return;
      }

      updateSelected([value]);

      setIsOpen(false);

      requestAnimationFrame(() => {
        buttonRef.current?.focus();
      });
    },
    [multiple, options, selected, updateSelected],
  );

  const handleReset = () => {
    updateSelected(initialValues);
    setIsOpen(false);
  };

  const openSelect = useCallback(() => {
    if (disabled) return;

    setIsOpen(true);
    setActiveIndex(0);
  }, [disabled]);

  const closeSelect = useCallback(() => {
    setIsOpen(false);
    setActiveIndex(null);
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (disabled) return;

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();

          if (!isOpen) {
            openSelect();
            return;
          }

          if (activeIndex === null) return;

          const next = activeIndex + 1;

          setActiveIndex((curr) => (next >= options.length ? curr : next));
          break;

        case "ArrowUp":
          event.preventDefault();

          if (!isOpen) {
            openSelect();
            return;
          }

          if (activeIndex === null) return;

          const previous = activeIndex - 1;

          setActiveIndex((curr) => (previous < 0 ? curr : previous));
          break;

        case "Home":
          if (!isOpen) return;

          event.preventDefault();

          setActiveIndex(0);
          break;

        case "End":
          if (!isOpen) return;

          event.preventDefault();

          setActiveIndex(options.length - 1);
          break;

        case "Enter":
        case " ":
          event.preventDefault();

          if (!isOpen) {
            openSelect();
            return;
          }

          if (activeOption !== null) {
            selectValue(activeOption.value);
          }

          break;

        case "Escape":
          if (!isOpen) return;

          event.preventDefault();
          closeSelect();
          break;

        case "Tab":
          if (isOpen) closeSelect();
          break;
      }
    },
    [isOpen, activeIndex, activeOption, options],
  );

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;

      if (rootRef.current && !rootRef.current.contains(target)) closeSelect();
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isOpen, closeSelect]);

  useEffect(() => {
    const form = buttonRef.current?.form;

    if (!form) return;

    form.addEventListener("reset", handleReset);

    return () => form.removeEventListener("reset", handleReset);
  }, [initialValues]);

  useEffect(() => {
    if (!isOpen) return;

    const element = document.getElementById(`${id}-option-${activeIndex}`);

    element?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [activeIndex, id, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    checkSpace();

    window.addEventListener("scroll", checkSpace, true);
    window.addEventListener("resize", checkSpace);

    return () => {
      window.removeEventListener("scroll", checkSpace, true);
      window.removeEventListener("resize", checkSpace);
    };
  }, [isOpen, checkSpace]);

  const defaultRenderValue = () => {
    if (selectedOptions.length === 0) {
      return <span className="text-gray-light font-light">{placeholder}</span>;
    }

    if (!multiple) return selectedOptions[0].label;

    return (
      <div className="flex min-w-0 flex-wrap gap-1">
        {selectedOptions.map((option) => (
          <span
            key={option.value}
            className="rounded-xs bg-dark dark:bg-light text-light dark:text-dark px-2 py-0.5 text-sm font-light"
          >
            {option.label}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div ref={rootRef} className={`relative w-full ${className}`}>
      {selected.map((value) => (
        <input key={value} type="hidden" name={name} value={value} />
      ))}

      {required && selected.length === 0 && (
        <input
          type="text"
          tabIndex={-1}
          aria-hidden="true"
          required
          value=""
          readOnly
          className="absolute h-0 w-0 overflow-hidden opacity-0"
          onChange={() => {}}
        />
      )}
      <button
        ref={buttonRef}
        id={id}
        type="button"
        role="combobox"
        disabled={disabled}
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-activedescendant={
          isOpen && activeIndex !== null && activeIndex >= 0
            ? `${id}-option-${activeIndex}`
            : undefined
        }
        aria-multiselectable={multiple || undefined}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        aria-label={ariaLabel}
        onClick={() => {
          if (isOpen) closeSelect();
          else setIsOpen(true);
        }}
        onKeyDown={handleKeyDown}
        className="
          flex min-h-10 w-full items-center
          justify-between gap-3 rounded-xs bg-dark/5 dark:bg-light/5
          p-3 border-b-2 border-transparent transition-all transition-1000 focus:border-dark dark:focus:border-light
          text-left 
          outline-none
          cursor-pointer
          disabled:cursor-not-allowed
          disabled:bg-gray-50
          disabled:opacity-60
          disabled:text-gray-700
          text-dark dark:text-light
          divide-x divide-dark dark:divide-light
          font-light
        "
      >
        <span className="min-w-0 flex-1">{defaultRenderValue()}</span>{" "}
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </button>

      {isOpen && (
        <div
          className={`md:absolute fixed inset-0 md:inset-auto md:p-0 p-3 flex items-center justify-center bg-gray-dark/15 md:bg-light dark:bg-light/15 md:dark:bg-dark
          md:backdrop-blur-none backdrop-blur-lg z-50 md:max-h-62 w-full md:shadow-2xl md:dark:shadow-light/10 ${hasSpaceBelow ? "md:top-12 md:mt-1 " : "md:bottom-12 md:mb-1"}`}
          onClick={(event) =>
            event.target === event.currentTarget && closeSelect()
          }
        >
          <div
            id={listboxId}
            ref={dropDownRef}
            className="bg-[#eeeeee] dark:bg-[#1c2022] w-full border border-dark/20 dark:border-light/20 rounded-xs outline-none overflow-auto  md:max-h-62 max-h-96"
            role="listbox"
            aria-multiselectable={multiple || undefined}
          >
            {options.map((option, index) => {
              const selected = isSelected(option.value);

              const active = activeIndex !== undefined && index === activeIndex;

              return (
                <div
                  key={option.value}
                  id={`${id}-option-${index}`}
                  role="option"
                  aria-selected={selected}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() =>
                    option.value === ""
                      ? handleReset()
                      : selectValue(option.value)
                  }
                  className={`
                  flex min-h-9 items-center
                  gap-3 rounded-xs p-3
                  select-none text-dark dark:text-light font-light
                  ${active ? "bg-gray-dark/20 dark:bg-gray-light/20" : ""}
                  ${selected ? "bg-gray-dark/40 dark:bg-gray-light/40" : ""}
                `}
                >
                  {option.label}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Select;

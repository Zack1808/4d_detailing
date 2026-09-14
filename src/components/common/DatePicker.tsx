import React, {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { FaCalendarAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";

type DatePickerProps = {
  value?: string;
  id?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  min?: string;
  max?: string;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  isDateDisabled?: (date: string) => boolean;
  required?: boolean;
  name?: string;
};

type CalendarDay = {
  date: string;
  day: number;
  currentMonth: boolean;
};

const WEEKDAYS = ["PON", "UTO", "SRI", "ČET", "PET", "SUB", "NED"];

const pad = (value: number) => String(value).padStart(2, "0");

const toDateString = (year: number, month: number, day: number) =>
  `${pad(day)}.${pad(month)}.${year}`;

const parseDate = (value: string): Date | null => {
  if (!value) return null;

  const match = /^(\d{1,2})\.(\d{1,2})\.(\d{4})$/.exec(value.trim());

  if (!match) return null;

  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);

  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
};

const formatDisplayDate = (value: string) => {
  const date = parseDate(value);

  if (!date) return "";

  return new Intl.DateTimeFormat("hr-HR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
};

const formatMonthYear = (date: Date) => {
  return new Intl.DateTimeFormat("hr-HR", {
    month: "long",
    year: "numeric",
  }).format(date);
};

const startOfMonth = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), 1);

const addMonths = (date: Date, amount: number) =>
  new Date(date.getFullYear(), date.getMonth() + amount, 1);

const addDays = (date: Date, amount: number) => {
  const result = new Date(date);

  result.setDate(result.getDate() + amount);

  return result;
};

const getDaysInMonth = (year: number, month: number) =>
  new Date(year, month + 1, 0).getDate();

const getDateString = (date: Date) =>
  toDateString(date.getFullYear(), date.getMonth() + 1, date.getDate());

const getTodayString = () => {
  return getDateString(new Date());
};

const compareDates = (a: string, b: string) => {
  const dateA = parseDate(a);
  const dateB = parseDate(b);

  if (!dateA || !dateB) {
    return 0;
  }

  const timeA = dateA.getTime();
  const timeB = dateB.getTime();

  if (timeA < timeB) return -1;
  if (timeA > timeB) return 1;

  return 0;
};

const isToday = (value: string) => value === getTodayString();

const getCalendarDays = (monthDate: Date): CalendarDay[] => {
  const year = monthDate.getFullYear();

  const month = monthDate.getMonth();

  const firstDay = new Date(year, month, 1);

  const firstDayIndex = (firstDay.getDay() + 6) % 7;

  const daysInCurrentMonth = getDaysInMonth(year, month);

  const previousMonth = addMonths(monthDate, -1);

  const previousYear = previousMonth.getFullYear();

  const previousMonthNumber = previousMonth.getMonth();

  const daysInPreviousMonth = getDaysInMonth(previousYear, previousMonthNumber);

  const days: CalendarDay[] = [];

  for (let i = firstDayIndex - 1; i >= 0; i--) {
    const day = daysInPreviousMonth - i;

    days.push({
      date: toDateString(previousYear, previousMonthNumber + 1, day),
      day,
      currentMonth: false,
    });
  }

  for (let day = 1; day <= daysInCurrentMonth; day++) {
    days.push({
      date: toDateString(year, month + 1, day),
      day,
      currentMonth: true,
    });
  }

  const nextMonth = addMonths(monthDate, 1);

  const nextYear = nextMonth.getFullYear();

  const nextMonthNumber = nextMonth.getMonth();

  while (days.length < 42) {
    const day = days.length - firstDayIndex - daysInCurrentMonth + 1;

    days.push({
      date: toDateString(nextYear, nextMonthNumber + 1, day),
      day,
      currentMonth: false,
    });
  }

  return days;
};

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  defaultValue = "",
  id,
  onChange,
  min,
  max,
  disabled = false,
  placeholder = "DD.MM.YYYY",
  className = "",
  isDateDisabled,
  required,
  name,
}) => {
  const isControlled = value !== undefined;

  const [internalValue, setInternalValue] = useState<string>(defaultValue);

  const selectedValue = isControlled ? value : internalValue;

  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState<string>(
    formatDisplayDate(selectedValue),
  );
  const [viewDate, setViewDate] = useState<Date>(() => {
    const selected = parseDate(selectedValue);

    return selected ? startOfMonth(selected) : startOfMonth(new Date());
  });
  const [focusedDate, setFocusedDate] = useState<string>(
    selectedValue || getTodayString(),
  );
  const [hasSpaceBelow, setHasSpaceBelow] = useState<boolean>(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const dayRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const calendarId = useId();

  const checkSpace = useCallback(() => {
    if (!containerRef.current || !calendarRef.current) return;

    const rootRect = containerRef.current.getBoundingClientRect();
    const dropDownHeight = calendarRef.current.offsetHeight;

    const availableSpace = window.innerHeight - rootRect.bottom;

    setHasSpaceBelow(dropDownHeight < availableSpace);
  }, []);

  useEffect(() => {
    setInputValue(formatDisplayDate(selectedValue));
  }, [selectedValue]);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, [isOpen]);

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

  const isDateUnavailable = useCallback(
    (date: string) => {
      if (!parseDate(date)) {
        return true;
      }

      if (min && compareDates(date, min) < 0) {
        return true;
      }

      if (max && compareDates(date, max) > 0) {
        return true;
      }

      if (isDateDisabled?.(date)) {
        return true;
      }

      return false;
    },
    [min, max, isDateDisabled],
  );

  const calendarDays = useMemo(() => getCalendarDays(viewDate), [viewDate]);

  useEffect(() => {
    if (!isOpen) return;

    requestAnimationFrame(() => {
      dayRefs.current[focusedDate]?.focus();
    });
  }, [isOpen, focusedDate, viewDate]);

  const selectDate = useCallback(
    (date: string) => {
      if (isDateUnavailable(date)) {
        return;
      }

      if (!isControlled) {
        setInternalValue(date);
      }

      setInputValue(formatDisplayDate(date));

      setFocusedDate(date);

      onChange?.(date);

      setIsOpen(false);

      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    },
    [isControlled, isDateUnavailable, onChange],
  );

  const openCalendar = useCallback(() => {
    if (disabled) return;

    const selected = parseDate(selectedValue);

    const dateToFocus = selected ? selectedValue : getTodayString();

    const parsed = parseDate(dateToFocus);

    if (parsed) {
      setViewDate(startOfMonth(parsed));
    }

    setFocusedDate(dateToFocus);

    setIsOpen(true);
  }, [disabled, selectedValue]);

  const changeMonth = useCallback((amount: number) => {
    setViewDate((previous) => addMonths(previous, amount));
  }, []);

  const parseDisplayValue = (value: string) => {
    const match = /^(\d{1,2})\.(\d{1,2})\.(\d{4})$/.exec(value.trim());

    if (!match) return null;

    const day = Number(match[1]);

    const month = Number(match[2]);

    const year = Number(match[3]);

    const date = toDateString(year, month, day);

    if (!parseDate(date)) {
      return null;
    }

    return date;
  };

  const commitInput = () => {
    if (!inputValue.trim()) {
      if (!isControlled) {
        setInternalValue("");
      }

      setInputValue("");
      onChange?.("");

      return;
    }

    const parsed = parseDisplayValue(inputValue);

    if (!parsed || isDateUnavailable(parsed)) {
      setInputValue(formatDisplayDate(selectedValue));

      return;
    }

    selectDate(parsed);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      event.key === "ArrowDown" ||
      event.key === "ArrowUp" ||
      event.key === "Enter" ||
      event.key === " "
    ) {
      event.preventDefault();

      if (!isOpen) {
        openCalendar();
      }

      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();

      setIsOpen(false);

      return;
    }

    if (event.key === "Tab") {
      commitInput();
    }
  };

  const handleCalendarKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
  ) => {
    if (event.key === "Escape") {
      event.preventDefault();

      setIsOpen(false);

      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });

      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();

      if (!isDateUnavailable(focusedDate)) {
        selectDate(focusedDate);
      }

      return;
    }

    const current = parseDate(focusedDate);

    if (!current) return;

    let next: Date | null = null;

    switch (event.key) {
      case "ArrowLeft":
        next = addDays(current, -1);
        break;

      case "ArrowRight":
        next = addDays(current, 1);
        break;

      case "ArrowUp":
        next = addDays(current, -7);
        break;

      case "ArrowDown":
        next = addDays(current, 7);
        break;

      case "Home":
        next = addDays(current, -((current.getDay() + 6) % 7));
        break;

      case "End":
        next = addDays(current, 6 - ((current.getDay() + 6) % 7));
        break;

      case "PageUp": {
        event.preventDefault();

        const amount = event.shiftKey ? -12 : -1;

        const target = new Date(
          current.getFullYear(),
          current.getMonth() + amount,
          1,
        );

        const maxDay = getDaysInMonth(target.getFullYear(), target.getMonth());

        target.setDate(Math.min(current.getDate(), maxDay));

        next = target;

        break;
      }

      case "PageDown": {
        event.preventDefault();

        const amount = event.shiftKey ? 12 : 1;

        const target = new Date(
          current.getFullYear(),
          current.getMonth() + amount,
          1,
        );

        const maxDay = getDaysInMonth(target.getFullYear(), target.getMonth());

        target.setDate(Math.min(current.getDate(), maxDay));

        next = target;

        break;
      }

      case "Tab":
        setIsOpen(false);

        requestAnimationFrame(() => {
          inputRef.current?.focus();
        });
        break;

      default:
        return;
    }

    event.preventDefault();

    if (!next) return;

    const nextValue = getDateString(next);

    setFocusedDate(nextValue);

    setViewDate(startOfMonth(next));

    requestAnimationFrame(() => {
      dayRefs.current[nextValue]?.focus();
    });
  };

  const goToToday = () => {
    const today = getTodayString();

    if (isDateUnavailable(today)) {
      return;
    }

    const parsed = parseDate(today);

    if (!parsed) return;

    selectDate(today);

    setFocusedDate(today);

    setViewDate(startOfMonth(parsed));

    requestAnimationFrame(() => {
      dayRefs.current[today]?.focus();
    });
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full flex-1 bg-dark/10 dark:bg-light/10 border-b-2 border-transparent focus-within:border-dark dark:focus-within:border-light transition-all transition-1000 flex flex-col items-center ${className}`}
    >
      <div className="relative flex w-full">
        <input
          type="text"
          id={id}
          ref={inputRef}
          inputMode="numeric"
          value={inputValue.replace(" ", "").replace(". ", ".")}
          disabled={disabled}
          required={required}
          placeholder={placeholder}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          aria-controls={calendarId}
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
          onClick={() => {
            if (isOpen) {
              setIsOpen(false);
            } else {
              openCalendar();

              requestAnimationFrame(() => {
                inputRef.current?.focus();
              });
            }
          }}
          name={name}
          onBlur={commitInput}
          onKeyDown={handleInputKeyDown}
          className="w-full rounded-xs cursor-pointer outline-none placeholder:text-gray-light text-dark dark:text-light p-3"
        />

        <button
          type="button"
          disabled={disabled}
          aria-label="Otvori kalendar"
          tabIndex={-1}
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => {
            if (isOpen) {
              setIsOpen(false);
            } else {
              openCalendar();

              requestAnimationFrame(() => {
                inputRef.current?.focus();
              });
            }
          }}
          className="p-3 text-dark dark:text-light text-2xl cursor-pointer"
        >
          <FaCalendarAlt />
        </button>
      </div>

      {isOpen && !disabled && (
        <div
          className={`md:absolute fixed flex items-center justify-center inset-0 md:inset-auto md:p-0 p-3 w-full md:max-w-sm z-50 bg-gray-dark/15 dark:bg-light/15 backdrop-blur-lg md:backdrop-blur-none md:shadow-2xl md:dark:shadow-light/10 md:bg-transparent ${hasSpaceBelow ? "md:top-full md:mt-1" : "md:bottom-full md:mb-1"}`}
          onClick={(event) =>
            event.target === event.currentTarget && setIsOpen(false)
          }
        >
          <div
            id={calendarId}
            ref={calendarRef}
            role="dialog"
            aria-label="Odaberite datum"
            className="p-3 rounded-xs bg-[#e5e5e4] dark:bg-[#1e1716] w-full border border-dark/20 dark:border-light/20"
          >
            <div
              role="application"
              aria-label="Kalendar"
              onKeyDown={handleCalendarKeyDown}
              className="outline-none"
            >
              <div className="mb-3 flex items-center justify-between">
                <button
                  type="button"
                  aria-label="Prošli mjesec"
                  onClick={() => changeMonth(-1)}
                  className="text-dark dark:text-light p-3 dark:hover:bg-light/5 hover:bg-dark/5 transition-color transition-500 cursor-pointer"
                >
                  <FaChevronLeft />
                </button>

                <div
                  aria-live="polite"
                  aria-atomic="true"
                  className="text-sm font-semibold text-dark dark:text-light capitalize"
                >
                  {formatMonthYear(viewDate).replace(".", "")}
                </div>

                <button
                  type="button"
                  aria-label="Idući mjesec"
                  onClick={() => changeMonth(1)}
                  className="text-dark dark:text-light p-3 dark:hover:bg-light/5 hover:bg-dark/5 transition-color transition-500 cursor-pointer"
                >
                  <FaChevronRight />
                </button>
              </div>

              <div className="mb-1 grid grid-cols-7" role="row">
                {WEEKDAYS.map((weekday) => (
                  <div
                    key={weekday}
                    role="columnheader"
                    className="text-dark dark:text-light text-center"
                  >
                    {weekday}
                  </div>
                ))}
              </div>

              <div
                className="grid grid-cols-7"
                role="grid"
                aria-label={formatMonthYear(viewDate)}
              >
                {calendarDays.map((calendarDay) => {
                  const unavailable = isDateUnavailable(calendarDay.date);

                  const selected = selectedValue === calendarDay.date;

                  const focused = focusedDate === calendarDay.date;

                  const today = isToday(calendarDay.date);

                  return (
                    <button
                      type="button"
                      key={calendarDay.date}
                      ref={(element) => {
                        dayRefs.current[calendarDay.date] = element;
                      }}
                      role="gridcell"
                      aria-label={calendarDay.date}
                      aria-selected={selected}
                      aria-disabled={unavailable}
                      tabIndex={focused ? 0 : -1}
                      disabled={unavailable}
                      onClick={() => {
                        selectDate(calendarDay.date);
                      }}
                      onFocus={() => {
                        setFocusedDate(calendarDay.date);
                      }}
                      className={`flex p-2  items-center  border-transparent justify-center cursor-pointer ${
                        calendarDay.currentMonth
                          ? "text-dark dark:text-light font-semibold"
                          : "bg-dark/10 dark:bg-light/10 text-dark/70 dark:text-light/70"
                      } disabled:bg-dark/30 dark:disabled:bg-light/50 disabled:cursor-auto disabled:text-dark/50 dark:disabled:text-light/50 ${
                        selected
                          ? "bg-dark text-light dark:bg-light dark:text-dark! focus:inset-ring-3 focus:inset-ring-light dark:focus:inset-ring-dark"
                          : "focus:inset-ring-dark dark:focus:inset-ring-light"
                      } ${
                        today
                          ? "inset-ring-dark dark:inset-ring-light inset-ring-3"
                          : ""
                      } focus:outline-none focus:inset-ring-2`}
                    >
                      {calendarDay.day}
                    </button>
                  );
                })}
              </div>

              <div className="mt-3 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);

                    requestAnimationFrame(() => {
                      inputRef.current?.focus();
                    });
                  }}
                  className="px-3 py-2 rounded-xs font-semibold border border-dark dark:border-light text-dark dark:text-light"
                >
                  Odustani
                </button>

                <button
                  type="button"
                  disabled={isDateUnavailable(getTodayString())}
                  onClick={goToToday}
                  className="px-3 py-2 bg-dark dark:bg-light text-light dark:text-dark rounded-xs font-semibold"
                >
                  Danas
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;

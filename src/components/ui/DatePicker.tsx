import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { FaCalendarDays, FaChevronLeft, FaChevronRight } from "react-icons/fa6";

import Popover from "./Popover";
import { POPOVER_PANEL, fieldWrapperBorder } from "./fieldStyles";

import { useClickOutside } from "../../hooks/useClickOutside";
import { usePopoverPlacement } from "../../hooks/usePopoverPlacement";

import { cn } from "../../utils/cn";
import { formatDate, parseDate } from "../../utils/date";

type DatePickerProps = {
  id: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  name?: string;
  min?: string;
  max?: string;
  isDateDisabled?: (date: string) => boolean;
  placeholder?: string;
  disabled?: boolean;
  invalid?: boolean;
  className?: string;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
};

type CalendarDay = { date: string; day: number; currentMonth: boolean };

const WEEKDAYS = ["PON", "UTO", "SRI", "ČET", "PET", "SUB", "NED"];

const monthYear = new Intl.DateTimeFormat("hr-HR", {
  month: "long",
  year: "numeric",
});
const longDate = new Intl.DateTimeFormat("hr-HR", { dateStyle: "long" });

const startOfMonth = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), 1);

const addDays = (date: Date, amount: number) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount);

const addMonths = (date: Date, amount: number) => {
  const target = new Date(date.getFullYear(), date.getMonth() + amount, 1);
  const lastDay = new Date(
    target.getFullYear(),
    target.getMonth() + 1,
    0,
  ).getDate();

  target.setDate(Math.min(date.getDate(), lastDay));

  return target;
};

const mondayIndex = (date: Date) => (date.getDay() + 6) % 7;

const getCalendarDays = (month: Date): CalendarDay[] => {
  const first = startOfMonth(month);
  const gridStart = addDays(first, -mondayIndex(first));

  return Array.from({ length: 42 }, (_, i) => {
    const date = addDays(gridStart, i);

    return {
      date: formatDate(date),
      day: date.getDate(),
      currentMonth: date.getMonth() === month.getMonth(),
    };
  });
};

const time = (value: string) => parseDate(value)?.getTime() ?? NaN;

const DatePicker = ({
  id,
  value,
  onChange,
  onBlur,
  name,
  min,
  max,
  isDateDisabled,
  placeholder = "DD.MM.GGGG",
  disabled = false,
  invalid,
  className,
  ...aria
}: DatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState<string | null>(null);
  const [viewDate, setViewDate] = useState(() =>
    startOfMonth(parseDate(value) ?? new Date()),
  );
  const [focusedDate, setFocusedDate] = useState(
    value || formatDate(new Date()),
  );

  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const dayRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const calendarId = useId();

  const dropUp = usePopoverPlacement(rootRef, panelRef, isOpen);
  const today = formatDate(new Date());

  const close = () => setIsOpen(false);

  useClickOutside(rootRef, close, isOpen);

  const isUnavailable = (date: string) => {
    const t = time(date);

    if (Number.isNaN(t)) return true;
    if (min && t < time(min)) return true;
    if (max && t > time(max)) return true;

    return Boolean(isDateDisabled?.(date));
  };

  const calendarDays = useMemo(() => getCalendarDays(viewDate), [viewDate]);
  const weeks = Array.from({ length: 6 }, (_, i) =>
    calendarDays.slice(i * 7, i * 7 + 7),
  );

  useEffect(() => {
    if (isOpen) dayRefs.current[focusedDate]?.focus();
  }, [isOpen, focusedDate, viewDate]);

  const focusInput = () =>
    requestAnimationFrame(() => inputRef.current?.focus());

  const openCalendar = () => {
    if (disabled) return;

    const target = parseDate(value) ?? new Date();

    setViewDate(startOfMonth(target));
    setFocusedDate(formatDate(target));
    setIsOpen(true);
  };

  const toggleCalendar = () => {
    if (isOpen) close();
    else openCalendar();
  };

  const select = (date: string) => {
    if (isUnavailable(date)) return;

    setDraft(null);
    onChange(date);
    close();
    focusInput();
  };

  const commitDraft = () => {
    if (draft !== null) {
      onChange(draft.trim());
      setDraft(null);
    }

    onBlur?.();
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (["ArrowDown", "ArrowUp"].includes(event.key)) {
      event.preventDefault();
      if (!isOpen) openCalendar();
    } else if (event.key === "Escape" && isOpen) {
      event.preventDefault();
      close();
    }
  };

  const handleCalendarKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
      focusInput();
      return;
    }

    if (event.key === "Tab") {
      close();
      focusInput();
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      select(focusedDate);
      return;
    }

    const current = parseDate(focusedDate);

    if (!current) return;

    const moves: Record<string, Date> = {
      ArrowLeft: addDays(current, -1),
      ArrowRight: addDays(current, 1),
      ArrowUp: addDays(current, -7),
      ArrowDown: addDays(current, 7),
      Home: addDays(current, -mondayIndex(current)),
      End: addDays(current, 6 - mondayIndex(current)),
      PageUp: addMonths(current, event.shiftKey ? -12 : -1),
      PageDown: addMonths(current, event.shiftKey ? 12 : 1),
    };

    const next = moves[event.key];

    if (!next) return;

    event.preventDefault();
    setFocusedDate(formatDate(next));
    setViewDate(startOfMonth(next));
  };

  return (
    <div
      ref={rootRef}
      className={cn(
        "relative w-full rounded-xs border-b-2 bg-dark/5 transition-colors duration-200 dark:bg-light/5 md:flex md:flex-col",
        fieldWrapperBorder(invalid),
        className,
      )}
    >
      <div className="flex w-full">
        <input
          ref={inputRef}
          id={id}
          name={name}
          type="text"
          role="combobox"
          inputMode="numeric"
          autoComplete="off"
          maxLength={10}
          value={draft ?? value}
          disabled={disabled}
          placeholder={placeholder}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          aria-controls={isOpen ? calendarId : undefined}
          onChange={(event) =>
            setDraft(event.target.value.replace(/[^\d.]/g, ""))
          }
          onClick={toggleCalendar}
          onBlur={commitDraft}
          onKeyDown={handleInputKeyDown}
          className="w-full cursor-pointer rounded-xs bg-transparent p-3 font-light outline-none placeholder:text-gray-light"
          {...aria}
        />

        <button
          type="button"
          disabled={disabled}
          aria-label="Otvori kalendar"
          tabIndex={-1}
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => {
            toggleCalendar();
            focusInput();
          }}
          className="cursor-pointer p-3 text-2xl"
        >
          <FaCalendarDays aria-hidden="true" />
        </button>
      </div>

      {isOpen && !disabled && (
        <Popover
          dropUp={dropUp}
          onDismiss={close}
          className="md:max-w-sm md:self-center"
        >
          <div
            id={calendarId}
            ref={panelRef}
            role="dialog"
            aria-label="Odaberite datum"
            className={cn(POPOVER_PANEL, "p-3")}
          >
            <div onKeyDown={handleCalendarKeyDown}>
              <div className="mb-3 flex items-center justify-between">
                <button
                  type="button"
                  aria-label="Prošli mjesec"
                  onClick={() => setViewDate((d) => addMonths(d, -1))}
                  className="cursor-pointer p-3 transition-colors hover:bg-dark/5 dark:hover:bg-light/5"
                >
                  <FaChevronLeft aria-hidden="true" />
                </button>

                <div aria-live="polite" className="font-normal capitalize">
                  {monthYear.format(viewDate).replace(".", "")}
                </div>

                <button
                  type="button"
                  aria-label="Idući mjesec"
                  onClick={() => setViewDate((d) => addMonths(d, 1))}
                  className="cursor-pointer p-3 transition-colors hover:bg-dark/5 dark:hover:bg-light/5"
                >
                  <FaChevronRight aria-hidden="true" />
                </button>
              </div>

              <div role="grid" aria-label={monthYear.format(viewDate)}>
                <div role="row" className="mb-1 grid grid-cols-7">
                  {WEEKDAYS.map((weekday) => (
                    <div
                      key={weekday}
                      role="columnheader"
                      className="text-center font-light"
                    >
                      {weekday}
                    </div>
                  ))}
                </div>

                {weeks.map((week) => (
                  <div
                    key={week[0].date}
                    role="row"
                    className="grid grid-cols-7"
                  >
                    {week.map(({ date, day, currentMonth }) => {
                      const unavailable = isUnavailable(date);
                      const selected = value === date;
                      const focused = focusedDate === date;

                      return (
                        <button
                          type="button"
                          key={date}
                          ref={(element) => {
                            dayRefs.current[date] = element;
                          }}
                          role="gridcell"
                          aria-label={longDate.format(
                            parseDate(date) ?? undefined,
                          )}
                          aria-selected={selected}
                          tabIndex={focused ? 0 : -1}
                          disabled={unavailable}
                          onClick={() => select(date)}
                          onFocus={() => setFocusedDate(date)}
                          className={cn(
                            "flex cursor-pointer items-center justify-center p-3 font-normal focus:inset-ring-2 focus:inset-ring-dark focus:outline-none dark:focus:inset-ring-light",
                            !currentMonth &&
                              "bg-dark/5 text-dark/80 dark:bg-light/5 dark:text-light/80",
                            unavailable &&
                              "cursor-auto bg-dark/30 text-dark/50 dark:bg-light/50 dark:text-light/50",
                            date === today &&
                              "inset-ring-3 inset-ring-dark dark:inset-ring-light",
                            selected &&
                              "bg-dark text-light dark:bg-light dark:text-dark",
                          )}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Popover>
      )}
    </div>
  );
};

export default DatePicker;

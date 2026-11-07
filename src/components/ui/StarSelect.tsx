import { useState, type KeyboardEvent } from "react";
import { FaRegStar, FaStar } from "react-icons/fa6";

import { useMediaQuery } from "../../hooks/useMediaQuery";
import { cn } from "../../utils/cn";

type StarSelectProps = {
  id: string;
  value: number;
  onChange: (value: number) => void;
  onBlur?: () => void;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
};

const STARS = [1, 2, 3, 4, 5];

const StarSelect = ({
  id,
  value,
  onChange,
  onBlur,
  ...aria
}: StarSelectProps) => {
  const [hover, setHover] = useState(0);
  const canHover = useMediaQuery("(hover: hover)");

  const shown = canHover && hover > 0 ? hover : value;

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step =
      event.key === "ArrowRight" || event.key === "ArrowUp"
        ? 1
        : event.key === "ArrowLeft" || event.key === "ArrowDown"
          ? -1
          : 0;

    if (!step) return;

    event.preventDefault();
    onChange(Math.min(5, Math.max(1, (value || 0) + step)));
  };

  return (
    <div
      id={id}
      role="radiogroup"
      aria-labelledby={`${id}-label`}
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      onMouseLeave={() => setHover(0)}
      onBlur={onBlur}
      className="flex -ml-3 w-fit"
      {...aria}
    >
      {STARS.map((star) => (
        <button
          key={star}
          type="button"
          role="radio"
          aria-checked={value === star}
          aria-label={`${star} od 5`}
          tabIndex={value === star || (value === 0 && star === 1) ? 0 : -1}
          onClick={() => onChange(star)}
          onMouseEnter={() => setHover(star)}
          className={cn(
            "cursor-pointer rounded-xs px-3 text-3xl transition-transform hover:scale-110 md:px-4",
          )}
        >
          {star <= shown ? (
            <FaStar aria-hidden="true" />
          ) : (
            <FaRegStar aria-hidden="true" />
          )}
        </button>
      ))}
    </div>
  );
};

export default StarSelect;

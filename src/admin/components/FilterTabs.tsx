import { cn } from "../../utils/cn";

type FilterTabsProps<V extends string> = {
  label: string;
  value: V;
  onChange: (value: V) => void;
  options: { value: V; label: string; count?: number }[];
};

const FilterTabs = <V extends string>({
  label,
  value,
  onChange,
  options,
}: FilterTabsProps<V>) => (
  <div role="group" aria-label={label} className="flex flex-wrap gap-3">
    {options.map((option) => (
      <button
        key={option.value}
        type="button"
        aria-pressed={value === option.value}
        onClick={() => onChange(option.value)}
        className={cn(
          "cursor-pointer rounded-xs px-4 py-2 font-medium transition-color",
          value === option.value
            ? "bg-dark text-light dark:bg-light dark:text-dark"
            : "bg-gray-light/15 hover:bg-gray-light/25",
        )}
      >
        {option.label}
        {option.count !== undefined && ` (${option.count})`}
      </button>
    ))}
  </div>
);

export default FilterTabs;

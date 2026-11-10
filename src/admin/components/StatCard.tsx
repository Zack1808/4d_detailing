import { Link } from "react-router-dom";

import { cn } from "../../utils/cn";

type StatCardProps = {
  label: string;
  value: string | number;
  hint?: string;
  to?: string;
};

const StatCard = ({ label, value, hint, to }: StatCardProps) => {
  const content = (
    <>
      <span className="text-sm font-semibold tracking-wide uppercase">
        {label}
      </span>
      <span className="text-5xl font-bold tabular-nums">{value}</span>
      {hint && (
        <span className="text-sm font-light text-gray-light">{hint}</span>
      )}
    </>
  );

  const classes = "surface flex flex-1 flex-col gap-3 p-6";

  return to ? (
    <Link
      to={to}
      className={cn(classes, "transition-colors hover:bg-gray-light/25")}
    >
      {content}
    </Link>
  ) : (
    <div className={classes}>{content}</div>
  );
};

export default StatCard;

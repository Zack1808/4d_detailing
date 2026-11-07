import Loader from "../ui/Loader";

import { cn } from "../../utils/cn";

const PageLoader = ({ className }: { className?: string }) => (
  <div
    role="status"
    aria-live="polite"
    className={cn(
      "fixed z-70 flex h-svh w-full flex-col items-center justify-center gap-6 bg-light dark:bg-dark",
      className,
    )}
  >
    <Loader size="lg" />
    <span className="text-2xl font-normal">Učitavanje...</span>
  </div>
);

export default PageLoader;

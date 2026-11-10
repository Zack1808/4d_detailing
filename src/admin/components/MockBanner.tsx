import { removeStorage } from "../../lib/storage";
import { USE_MOCK_DATA } from "../../services/pageData";
import { USE_MOCK_AUTH } from "../auth/authApi";
import { MOCK_DB_KEY } from "../data/mockKeys";

import Button from "../../components/ui/Button";

import { cn } from "../../utils/cn";

const MockBanner = ({ className }: { className?: string }) => {
  if (!USE_MOCK_AUTH && !USE_MOCK_DATA) return null;

  const modes = [USE_MOCK_AUTH && "prijava", USE_MOCK_DATA && "podaci"]
    .filter(Boolean)
    .join(" i ");

  const reset = () => {
    removeStorage(MOCK_DB_KEY);
    window.location.reload();
  };

  return (
    <div
      role="note"
      className={cn(
        "flex flex-wrap items-center justify-center gap-x-4 bg-amber-400 px-4 py-2 text-sm font-medium text-dark",
        className,
      )}
    >
      <span>
        MOCK način ({modes}) – ništa se ne sprema na pravi poslužitelj.
      </span>
      {USE_MOCK_DATA && (
        <Button
          variant="link"
          className="py-0 text-sm font-semibold"
          onClick={reset}
        >
          Resetiraj mock podatke
        </Button>
      )}
    </div>
  );
};

export default MockBanner;

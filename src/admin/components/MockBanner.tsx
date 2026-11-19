import { removeStorage } from "../../lib/storage";
import { USE_MOCK_CONTACTS } from "../../services/contactsApi";
import { USE_MOCK_DATA } from "../../services/pageData";
import { USE_MOCK_AUTH } from "../auth/authApi";
import { USE_MOCK_CALENDAR } from "../data/calendarApi";
import { USE_MOCK_EMAIL } from "../data/emailApi";
import {
  MOCK_CALENDAR_KEY,
  MOCK_CONTACTS_KEY,
  MOCK_DB_KEY,
  MOCK_OUTBOX_KEY,
} from "../data/mockKeys";

import Button from "../../components/ui/Button";

import { cn } from "../../utils/cn";

const MockBanner = ({ className }: { className?: string }) => {
  if (
    !USE_MOCK_AUTH &&
    !USE_MOCK_DATA &&
    !USE_MOCK_EMAIL &&
    !USE_MOCK_CALENDAR &&
    !USE_MOCK_CONTACTS
  )
    return null;

  const modes = [
    USE_MOCK_AUTH && "prijava",
    USE_MOCK_DATA && "podaci",
    USE_MOCK_EMAIL && "e-mail",
    USE_MOCK_CALENDAR && "kalendar",
    USE_MOCK_CONTACTS && "kontakti",
  ]
    .filter(Boolean)
    .join(", ");

  const reset = () => {
    [
      MOCK_DB_KEY,
      MOCK_OUTBOX_KEY,
      MOCK_CALENDAR_KEY,
      MOCK_CONTACTS_KEY,
    ].forEach(removeStorage);
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

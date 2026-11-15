import StatusBadge from "./StatusBadge";

import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";

import { getAppointmentState } from "../data/appointmentActions";
import {
  getPastServices,
  type HistoryEntry,
  type MatchReason,
} from "../data/customerHistory";

import type { AppointmentType } from "../../types/data";

const MATCH_LABEL: Record<MatchReason, string> = {
  email: "isti email",
  phone: "isti telefon",
};

const MAX_INLINE = 3;

const sumarize = (history: HistoryEntry[]) => {
  const counts = new Map<string, number>();

  getPastServices(history).forEach(({ appointment }) =>
    counts.set(appointment.service, (counts.get(appointment.service) ?? 0) + 1),
  );

  return [...counts].map(([name, count]) =>
    count > 1 ? `${name} × ${count}` : name,
  );
};

type SummaryProps = {
  history: HistoryEntry[];
  onOpen: () => void;
};

export const CustomerHistorySummary = ({ history, onOpen }: SummaryProps) => {
  if (history.length === 0) return null;

  const services = sumarize(history);
  const shown = services.slice(0, MAX_INLINE);
  const hidden = services.length - shown.length;

  return (
    <div className="mt-2 flex flex-col items-start gap-1 text-sm">
      <p>
        <span className="font-medium">Ponovni klijent</span>
        {shown.length > 0 && (
          <>
            {" · ranije: "} {shown.join(", ")}{" "}
            {hidden > 0 &&
              ` i još 
        ${hidden}`}
          </>
        )}
      </p>
      <Button
        variant="link"
        className="py-0 text-sm underline"
        onClick={onOpen}
        aria-label={`Prikaži povijest klijenata ${history[0].appointment.fullName}`}
      >
        Prikaži povijest ${history[0].appointment.fullName}
      </Button>
    </div>
  );
};

type DialogProps = {
  appointment: AppointmentType | null;
  history: HistoryEntry[];
  onClose: () => void;
};

const STATE_LABEL = {
  pending: "Na čekanju",
  confirmed: "Potvrđen",
  denied: "Odbijen",
} as const;

export const CustomerHistoryDialog = ({
  appointment,
  history,
  onClose,
}: DialogProps) => (
  <Modal
    open={appointment !== null}
    onClose={onClose}
    title="Povijest klijenta"
  >
    {appointment && (
      <div className="mt-3 flex flex-col gap-6">
        <p className="font-light">
          <strong className="font-semibold">{appointment.fullName}</strong>
          {appointment.email}, {appointment.phone}. Klijenti se ne prijavljuju
          pa se termini povezuju prema e-mailu ili broju telefona.
        </p>

        {history.length === 0 ? (
          <p className="font-light text-gray-light">
            Nema drugih termina ovog klijenta
          </p>
        ) : (
          <ul className="flex flex-col gap-3">
            {history.map(({ appointment: past, matchedBy }) => (
              <li
                key={past.id}
                className="surface flex flex-col gap-3 p-3 sm:flex-row sm:items-start sm:justify-between"
              >
                <div className="flex flex-col gap-1">
                  <p className="font-medium">{past.service}</p>
                  <p className="text-sm font-light">
                    {past.vehicle}{" "}
                    {past.dateTo && past.dateTo === past.dateFrom
                      ? `${past.dateFrom} - ${past.dateTo}`
                      : past.dateFrom || "bez termina"}
                  </p>
                  <p className="text-xs font-light text-gray-light">
                    {past.fullName} (
                    {matchedBy.map((reason) => MATCH_LABEL[reason]).join(", ")})
                  </p>
                </div>
                <StatusBadge tone={past.isConfirmed ? "success" : "warning"}>
                  {STATE_LABEL[getAppointmentState(past)]}
                </StatusBadge>
              </li>
            ))}
          </ul>
        )}

        <div className="flex justify-end">
          <Button variant="primary" onClick={onClose}>
            Zatvori
          </Button>
        </div>
      </div>
    )}
  </Modal>
);

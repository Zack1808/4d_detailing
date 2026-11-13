import { useMemo, useState } from "react";

import FilterTabs from "../components/FilterTabs";
import CollectionState from "../components/CollectionState";
import ConfirmDialog from "../components/ConfirmDialog";
import PageHeader from "../components/PageHeader";
import StatusBadge, { type Tone } from "../components/StatusBadge";
import { BodyRow, HeadRow, TableShell, Td, Th } from "../components/Table";

import {
  confirmAppointment,
  countOverlaps,
  denyAppointment,
  getAppointmentState,
  getRange,
  type AppointmentState,
  type DateRange,
} from "../data/appointmentActions";
import { appointmentRepo, blockedDatesRepo } from "../data/repositories";
import { useCollections } from "../data/useCollections";

import Button from "../../components/ui/Button";
import DatePicker from "../../components/ui/DatePicker";
import Field from "../../components/ui/Field";
import Input from "../../components/ui/Input";
import Modal from "../../components/ui/Modal";

import { parseDate } from "../../utils/date";
import { getErrorMessage } from "../../utils/errors";
import { normalizeText } from "../../utils/text";
import { notifyError, notifySuccess } from "../../utils/toast";

import type { AppointmentType } from "../../types/data";

type Filter = AppointmentState | "all";

const STATE_LABEL: Record<AppointmentState, string> = {
  pending: "Na čekanju",
  confirmed: "Potvrđen",
  denied: "Odbijen",
};

const STATE_TONE: Record<AppointmentState, string> = {
  pending: "warning",
  confirmed: "success",
  denied: "danger",
};

const FILTERS: { value: Filter; label: string }[] = [
  {
    value: "pending",
    label: "Na čekanju",
  },
  {
    value: "confirmed",
    label: "Potvrđeni",
  },
  {
    value: "denied",
    label: "Odbijeni",
  },
  {
    value: "all",
    label: "Svi",
  },
];

const STATE_ORDER: Record<AppointmentState, number> = {
  pending: 0,
  confirmed: 1,
  denied: 2,
};

const time = (appointment: AppointmentType) =>
  parseDate(appointment.dateFrom)?.getTime() ?? Number.MAX_SAFE_INTEGER;

type Action =
  | { type: "confirm"; appointment: AppointmentType }
  | { type: "deny"; appointment: AppointmentType }
  | { type: "delete"; appointment: AppointmentType };

const AppointmentsPage = () => {
  const appointments = useCollections(appointmentRepo);
  const blocked = useCollections(blockedDatesRepo);

  const [filter, setFilter] = useState<Filter>("pending");
  const [search, setSearch] = useState<string>("");
  const [action, setAction] = useState<Action | null>(null);
  const [range, setRange] = useState<DateRange>({ dateFrom: "", dateTo: "" });
  const [rangeError, setRangeError] = useState<string>();
  const [busy, setBusy] = useState<boolean>(false);

  const counts = useMemo(() => {
    const results: Record<Filter, number> = {
      pending: 0,
      confirmed: 0,
      denied: 0,
      all: appointments.items.length,
    };

    appointments.items.forEach((a) => (results[getAppointmentState(a)] += 1));

    return results;
  }, [appointments.items]);

  const rows = useMemo(() => {
    const term = normalizeText(search.trim());

    return appointments.items
      .filter((a) => filter === "all" || getAppointmentState(a) === filter)
      .filter(
        (a) =>
          !term ||
          normalizeText(
            `${a.fullName} ${a.email} ${a.phone} ${a.vehicle}`,
          ).includes(term),
      )
      .sort(
        (a, b) =>
          STATE_ORDER[getAppointmentState(a)] -
            STATE_ORDER[getAppointmentState(b)] || time(a) - time(b),
      );
  }, [appointments.items, filter, search]);

  const openConfirm = (appointment: AppointmentType) => {
    setRange(getRange(appointment));
    setRangeError(undefined);
    setAction({ type: "confirm", appointment });
  };

  const close = () => {
    if (!busy) setAction(null);
  };

  const run = async (task: () => Promise<void>, success: string) => {
    setBusy(true);

    try {
      await task();
      await Promise.all([appointments.refresh(), blocked.refresh()]);
      notifySuccess(success);
      setAction(null);
    } catch (error) {
      console.error("Appointment action failed: ", error);
      notifyError(getErrorMessage(error));
    } finally {
      setBusy(false);
    }
  };

  const submitConfirm = () => {
    if (action?.type !== "confirm") return;

    const from = parseDate(range.dateFrom);
    const to = parseDate(range.dateTo);

    if (!from || !to) {
      setRangeError("Unesite ispravne datume.");
      return;
    }

    if (to.getTime() < from.getTime()) {
      setRangeError("Završni datum ne može biti prije početnog.");
      return;
    }

    run(
      () => confirmAppointment(action?.appointment, range),
      "Termin je potvrđen",
    );
  };

  const overlaps =
    action?.type === "confirm"
      ? countOverlaps(range, blocked.items, action.appointment.id)
      : 0;

  const loadStatus =
    appointments.status === "error" || blocked.status === "error"
      ? "error"
      : appointments.status === "loading" || blocked.status === "loading"
        ? "loading"
        : "ready";

  return (
    <>
      <PageHeader
        title="Termini"
        description="Zahtjevi poslani preko kontakt forme. Potvrda rezervira datume u kalendaru."
      />

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <FilterTabs
          label="Filter termina"
          value={filter}
          onChange={setFilter}
          options={FILTERS.map((item) => ({
            ...item,
            count: counts[item.value],
          }))}
        />

        <Input
          type="search"
          aria-label="Pretraži termine"
          placeholder="Pretraži po imenu, emailu, vozilu..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="md:max-w-sm"
        />
      </div>

      <CollectionState
        status={loadStatus}
        error={appointments.error || blocked.error}
        onRetry={() => {
          appointments.reload();
          blocked.reload();
        }}
        isEmpty={rows.length === 0}
        emptyMessage="Nema termina za odabrani filter"
      >
        <TableShell>
          <HeadRow>
            <Th>Datum</Th>
            <Th>Klijent</Th>
            <Th>Usluga i vozilo</Th>
            <Th>Status</Th>
            <Th className="text-right">Akcije</Th>
          </HeadRow>
          <tbody>
            {rows.map((a) => {
              const state = getAppointmentState(a);
              const { dateFrom, dateTo } = getRange(a);

              return (
                <BodyRow key={a.id}>
                  <Td className="whitespace-nowrap">
                    {dateFrom === dateTo ? dateFrom : `${dateFrom} - ${dateTo}`}
                  </Td>
                  <Td>
                    <p className="font-medium">{a.fullName}</p>
                    <p className="text-sm">
                      <a className="underline" href={`mailto:${a.email}`}>
                        {a.email}
                      </a>
                    </p>
                    <p className="text-sm">
                      <a
                        href={`tel:${a.phone.replace(/\s/g, "")}`}
                        className="underline"
                      >
                        {a.phone}
                      </a>
                    </p>
                  </Td>
                  <Td>
                    <p>{a.service}</p>
                    <p className="text-sm text-gray-light">{a.vehicle}</p>
                    {a.remark && (
                      <p className="mt-1 max-w-[40ch] text-sm italic">
                        {a.remark}
                      </p>
                    )}
                  </Td>
                  <Td>
                    <StatusBadge tone={STATE_TONE[state] as Tone}>
                      {STATE_LABEL[state]}
                    </StatusBadge>
                  </Td>
                  <Td>
                    <div className="flex flex-wrap justify-end gap-3">
                      {state === "pending" && (
                        <>
                          <Button
                            variant="primary"
                            className="px-3 py-2 text-sm"
                            onClick={() => openConfirm(a)}
                          >
                            Potvrdi
                          </Button>
                          <Button
                            variant="secondary"
                            className="px-3 py-2 text-sm"
                            onClick={() =>
                              setAction({ type: "deny", appointment: a })
                            }
                          >
                            Odbij
                          </Button>
                        </>
                      )}
                      {state === "confirmed" && (
                        <Button
                          variant="secondary"
                          className="px-3 py-2 text-sm"
                          onClick={() =>
                            setAction({ type: "deny", appointment: a })
                          }
                        >
                          Otkaži
                        </Button>
                      )}
                      {state === "denied" && (
                        <Button
                          variant="secondary"
                          className="px-3 py-2 text-sm"
                          onClick={() =>
                            setAction({ type: "delete", appointment: a })
                          }
                        >
                          Obriši
                        </Button>
                      )}
                    </div>
                  </Td>
                </BodyRow>
              );
            })}
          </tbody>
        </TableShell>
      </CollectionState>

      <Modal
        open={action?.type === "confirm"}
        onClose={close}
        title="Potvrda termina"
      >
        {action?.type === "confirm" && (
          <div className="mt-3 flex flex-col gap-6">
            <p className="font-light">
              <strong className="font-semibold">
                {action.appointment.fullName}
              </strong>
              {" - "}
              {action.appointment.service} ({action.appointment.vehicle}).
              Odaberite raspon dana koje usluga zauzima; ti će datumi biti
              blokirani u kalendaru.
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              <Field id="range-from" label="Prvi dan" required>
                <DatePicker
                  id="range-from"
                  value={range.dateFrom}
                  onChange={(dateFrom) => {
                    setRange((r) => ({ ...r, dateFrom }));
                    setRangeError(undefined);
                  }}
                />
              </Field>

              <Field
                id="range-to"
                label="Zadnji dan"
                required
                error={rangeError}
              >
                <DatePicker
                  id="range-to"
                  value={range.dateTo}
                  invalid={Boolean(rangeError)}
                  aria-invalid={rangeError ? true : undefined}
                  aria-describedby={rangeError ? "range-to-error" : undefined}
                  onChange={(dateTo) => {
                    setRange((r) => ({ ...r, dateTo }));
                    setRangeError(undefined);
                  }}
                />
              </Field>
            </div>

            {overlaps > 0 && (
              <p
                className="text-sm text-amber-700 dark:text-amber-300"
                role="status"
              >
                Za ove datume već postoji još {overlaps} blokiranih termina
              </p>
            )}

            <p className="text-sm font-light text-gray-light">
              Klijentu još ne šaljemo e-mail automatski – potvrdu mu za sada
              javite sami.
            </p>

            <div className="flex flex-wrap justify-end gap-3">
              <Button variant="secondary" onClick={close} disabled={busy}>
                Odustani
              </Button>
              <Button variant="primary" onClick={submitConfirm} loading={busy}>
                Potvrdi termin
              </Button>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmDialog
        open={action?.type === "deny"}
        title={
          action?.type === "deny" && action.appointment.isConfirmed
            ? "Otkazati termin?"
            : "Odbiti zahtjev?"
        }
        confirmLabel={
          action?.type === "deny" && action.appointment.isConfirmed
            ? "Otkaži termin"
            : "Odbij zahtjev"
        }
        loading={busy}
        onClose={close}
        onConfirm={() =>
          action?.type === "deny" &&
          run(
            () => denyAppointment(action.appointment, blocked.items),
            "Zahtjev je odbijen.",
          )
        }
      >
        {action?.type === "deny" && (
          <p>
            {action.appointment.fullName} – {action.appointment.dateFrom}.
            Rezervirani datumi (ako postoje) bit će oslobođeni. Klijentu još ne
            šaljemo e-mail automatski.
          </p>
        )}
      </ConfirmDialog>

      <ConfirmDialog
        open={action?.type === "delete"}
        title="Obrisati zahtjev?"
        confirmLabel="Obriši"
        loading={busy}
        onClose={close}
        onConfirm={() =>
          action?.type === "delete" &&
          run(async () => {
            await appointmentRepo.remove(action.appointment.id);
          }, "Zahtjev je obrisan.")
        }
      >
        {action?.type === "delete" && (
          <p>
            Zahtjev klijenta {action.appointment.fullName} bit će trajno
            obrisan.
          </p>
        )}
      </ConfirmDialog>
    </>
  );
};

export default AppointmentsPage;

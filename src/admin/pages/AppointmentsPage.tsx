import { useMemo, useState } from "react";

import FilterTabs from "../components/FilterTabs";
import CollectionState from "../components/CollectionState";
import {
  CustomerHistoryDialog,
  CustomerHistorySummary,
} from "../components/CustomerHistory";
import ConfirmDialog from "../components/ConfirmDialog";
import PageHeader from "../components/PageHeader";
import RescheduleDialog from "../components/RescheduleDialog";
import StatusBadge, { type Tone } from "../components/StatusBadge";
import { BodyRow, HeadRow, TableShell, Td, Th } from "../components/Table";
import { APPOINTMENT_COLUMNS, TableSkeleton } from "../components/skeletons";

import {
  confirmAppointment,
  countOverlaps,
  denyAppointment,
  findService,
  getAppointmentState,
  getDefaultPhases,
  getRange,
  getStartDate,
  getSuggestedRange,
  proposeReschedule,
  type AppointmentState,
  type DateRange,
} from "../data/appointmentActions";
import { USE_MOCK_CALENDAR } from "../data/calendarApi";
import { getCustomerHistory } from "../data/customerHistory";
import {
  appointmentRepo,
  blockedDatesRepo,
  serviceRepo,
} from "../data/repositories";
import { useCollections } from "../data/useCollections";

import Button from "../../components/ui/Button";
import DatePicker from "../../components/ui/DatePicker";
import Field from "../../components/ui/Field";
import Input from "../../components/ui/Input";
import Modal from "../../components/ui/Modal";

import { addDaysToValue, parseDate } from "../../utils/date";
import {
  formatDays,
  formatDuration,
  getBlockedDays,
  getDurationUnit,
} from "../../utils/duration";
import { getErrorMessage } from "../../utils/errors";
import { normalizeText } from "../../utils/text";
import { notifyError, notifySuccess, notifyWarning } from "../../utils/toast";

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
  | { type: "reschedule"; appointment: AppointmentType }
  | { type: "deny"; appointment: AppointmentType }
  | { type: "delete"; appointment: AppointmentType };

const AppointmentsPage = () => {
  const appointments = useCollections(appointmentRepo);
  const blocked = useCollections(blockedDatesRepo);
  const services = useCollections(serviceRepo);

  const [filter, setFilter] = useState<Filter>("pending");
  const [search, setSearch] = useState<string>("");
  const [action, setAction] = useState<Action | null>(null);
  const [range, setRange] = useState<DateRange>({ dateFrom: "", dateTo: "" });
  const [rangeError, setRangeError] = useState<string>();
  const [phases, setPhases] = useState<string>("1");
  const [busy, setBusy] = useState<boolean>(false);
  const [historyFor, setHistoryFor] = useState<AppointmentType | null>(null);
  const [rescheduleKey, setRescheduleKey] = useState(0);

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

  const histories = useMemo(
    () =>
      new Map(
        appointments.items.map((a) => [
          a.id,
          getCustomerHistory(a, appointments.items),
        ]),
      ),
    [appointments.items],
  );

  const getFit = (appointment: AppointmentType) => {
    const service = findService(appointment, services.items);
    const days = getBlockedDays(
      service,
      getDefaultPhases(appointment, service),
    );
    const start = getStartDate(appointment);
    const overlaps =
      start && days !== null
        ? countOverlaps(
            { dateFrom: start, dateTo: addDaysToValue(start, days - 1) },
            blocked.items,
            appointment.id,
          ) > 0
        : false;

    return { service, days, overlaps };
  };

  const phaseCount = (value: string) => {
    const count = Number(value);

    return Number.isInteger(count) && count >= 1 ? count : 1;
  };

  const confirmService =
    action?.type === "confirm"
      ? findService(action.appointment, services.items)
      : undefined;
  const confirmDays = getBlockedDays(confirmService, phaseCount(phases));

  const openConfirm = (appointment: AppointmentType) => {
    const service = findService(appointment, services.items);
    const defaultPhases = getDefaultPhases(appointment, service);
    const start = getStartDate(appointment);

    setPhases(String(defaultPhases));
    setRange(
      service && getBlockedDays(service, defaultPhases) !== null
        ? getSuggestedRange(start, service, defaultPhases)
        : { dateFrom: start, dateTo: appointment.dateTo ?? start },
    );
    setRangeError(undefined);
    setAction({ type: "confirm", appointment });
  };

  const openReschedule = (appointment: AppointmentType) => {
    setRescheduleKey((key) => key + 1);
    setAction({ type: "reschedule", appointment });
  };

  const updateRange = (dateFrom: string, phaseValue: string) => {
    const days = getBlockedDays(confirmService, phaseCount(phaseValue));

    setRange((current) =>
      days === null
        ? { ...current, dateFrom }
        : getSuggestedRange(dateFrom, confirmService, phaseCount(phaseValue)),
    );
    setRangeError(undefined);
  };

  const close = () => {
    if (!busy) setAction(null);
  };

  const run = async (
    task: () => Promise<{ warning?: string } | void>,
    success: string,
  ): Promise<boolean> => {
    setBusy(true);

    try {
      const result = await task();

      await Promise.all([appointments.refresh(), blocked.refresh()]);
      notifySuccess(success);
      if (result?.warning) notifyWarning(result.warning);
      setAction(null);

      return true;
    } catch (error) {
      console.error("Appointment action failed: ", error);
      notifyError(getErrorMessage(error));

      return false;
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

    run(async () => {
      const { calendar } = await confirmAppointment(
        action.appointment,
        range,
        phaseCount(phases),
      );

      if (calendar === "failed") {
        return {
          warning:
            "Termin je potvrđen, ali nije dodan u Google Calendar. Dodajte ga ručno.",
        };
      }
    }, "Termin je potvrđen");
  };

  const overlaps =
    action?.type === "confirm"
      ? countOverlaps(range, blocked.items, action.appointment.id)
      : 0;

  const sources = [appointments, blocked, services];
  const loadStatus = sources.some((source) => source.status === "error")
    ? "error"
    : sources.some((source) => source.status === "loading")
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
            count: loadStatus === "ready" ? counts[item.value] : undefined,
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
        error={appointments.error || blocked.error || services.error}
        skeleton={<TableSkeleton columns={APPOINTMENT_COLUMNS} />}
        onRetry={() => {
          appointments.reload();
          blocked.reload();
          services.reload();
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
              const { days, overlaps: noFit } = getFit(a);
              const proposal = a.rescheduleProposal;

              return (
                <BodyRow key={a.id}>
                  <Td className="whitespace-nowrap">
                    {dateFrom ? (
                      <p>
                        {dateFrom === dateTo
                          ? dateFrom
                          : `${dateFrom} - ${dateTo}`}
                      </p>
                    ) : (
                      <p className="text-muted">Bez termina</p>
                    )}
                    {state === "pending" && proposal && (
                      <p className="text-sm">Predloženo: {proposal.dateFrom}</p>
                    )}
                    {state === "pending" && days !== null && (
                      <p className="text-sm text-muted">
                        Zauzima {formatDays(days)}
                      </p>
                    )}
                    {state === "pending" && noFit && (
                      <p
                        className="mt-1 max-w-[22ch] text-sm whitespace-normal text-amber-700 dark:text-amber-300"
                        role="status"
                      >
                        Preklapa se s blokiranim datumima
                      </p>
                    )}
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
                    <CustomerHistorySummary
                      history={histories.get(a.id) ?? []}
                      onOpen={() => setHistoryFor(a)}
                    />
                  </Td>
                  <Td>
                    <p>{a.service}</p>
                    <p className="text-sm text-muted">{a.vehicle}</p>
                    {a.remark && (
                      <p className="mt-1 max-w-[40ch] text-sm italic">
                        {a.remark}
                      </p>
                    )}
                  </Td>
                  <Td>
                    <div className="flex flex-col items-start gap-1">
                      <StatusBadge tone={STATE_TONE[state] as Tone}>
                        {STATE_LABEL[state]}
                      </StatusBadge>
                      {state === "pending" && proposal && (
                        <StatusBadge>Novi termin predložen</StatusBadge>
                      )}
                      {state === "confirmed" && a.calendarEventId && (
                        <span className="text-sm">U Google Calendaru</span>
                      )}
                      {a.contactId && (
                        <span className="text-sm">Kontakt u Googleu</span>
                      )}
                    </div>
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
                            onClick={() => openReschedule(a)}
                          >
                            Predloži novi termin
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

            {confirmService?.durationPerPhase && (
              <Field
                id="phases"
                label="Broj faza"
                required
                hint={`Trajanje usluge: ${formatDuration(confirmService)} po fazi.`}
              >
                <Input
                  id="phases"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={20}
                  value={phases}
                  onChange={(event) => {
                    setPhases(event.target.value);
                    updateRange(range.dateFrom, event.target.value);
                  }}
                />
              </Field>
            )}

            <p className="text-sm font-light" role="status">
              {confirmDays !== null ? (
                <>
                  Trajanje usluge: {formatDuration(confirmService)}
                  {confirmService?.durationPerPhase &&
                    ` po fazi × ${phaseCount(phases)}`}
                  {". Blokira se "}
                  <strong className="font-semibold">
                    {formatDays(confirmDays)}
                  </strong>{" "}
                  {getDurationUnit(confirmService) === "hours"
                    ? "(usluga traje nekoliko sati, pa se blokira cijeli dan)"
                    : "(gornja granica trajanja)"}
                  . Raspon možete i ručno promijeniti.
                </>
              ) : (
                "Za ovu uslugu trajanje nije zadano pa raspon unesite ručno (trajanje se postavlja u Uslugama)."
              )}
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              <Field id="range-from" label="Prvi dan" required>
                <DatePicker
                  id="range-from"
                  value={range.dateFrom}
                  onChange={(dateFrom) => updateRange(dateFrom, phases)}
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
              <div
                className="flex flex-col items-start gap-2 text-sm text-amber-700 dark:text-amber-300"
                role="status"
              >
                <p>
                  Za ove datume već postoji još {overlaps} blokiranih termina.
                </p>
                <Button
                  variant="link"
                  className="py-0 text-sm underline"
                  onClick={() => openReschedule(action.appointment)}
                >
                  Predloži klijentu drugi termin
                </Button>
              </div>
            )}

            <p className="text-sm font-light text-muted">
              Potvrđeni termin dodaje se u Google Calendar s podsjetnikom dan
              ranije u 18:00
              {USE_MOCK_CALENDAR && " (mock: sprema se samo u preglednik)"}.
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

      <RescheduleDialog
        key={rescheduleKey}
        open={action?.type === "reschedule"}
        appointment={action?.type === "reschedule" ? action.appointment : null}
        blocked={blocked.items}
        days={
          action?.type === "reschedule"
            ? (getFit(action.appointment).days ?? 1)
            : 1
        }
        onClose={close}
        onSubmit={({ dateFrom, message }) =>
          action?.type === "reschedule"
            ? run(
                () =>
                  proposeReschedule(action.appointment, { dateFrom, message }),
                "Prijedlog novog termina poslan je klijentu.",
              )
            : Promise.resolve(false)
        }
      />

      <CustomerHistoryDialog
        appointment={historyFor}
        history={historyFor ? (histories.get(historyFor.id) ?? []) : []}
        onClose={() => setHistoryFor(null)}
      />

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
            Rezervirani datumi (ako postoje) bit će oslobođeni, a termin
            uklonjen iz Google Calendara. Klijentu još ne šaljemo e-mail
            automatski.
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

import { useMemo, useState } from "react";

import CollectionState from "../components/CollectionState";
import ConfirmDialog from "../components/ConfirmDialog";
import PageHeader from "../components/PageHeader";
import { BodyRow, HeadRow, TableShell, Th, Td } from "../components/Table";

import { appointmentRepo, blockedDatesRepo } from "../data/repositories";
import { useCollections } from "../data/useCollections";

import Button from "../../components/ui/Button";
import DatePicker from "../../components/ui/DatePicker";
import Field from "../../components/ui/Field";

import { useForm } from "../../hooks/useForm";

import { parseDate } from "../../utils/date";
import { MESSAGES } from "../../validation/rules";
import { notifySuccess } from "../../utils/toast";

import type { BlockedAppointments } from "../../types/data";

type Values = { dateFrom: string; dateTo: string };

const validate = ({ dateFrom, dateTo }: Values) => {
  const errors: Partial<Record<keyof Values, string>> = {};
  const from = parseDate(dateFrom);
  const to = parseDate(dateTo);

  if (!dateFrom) errors.dateFrom = MESSAGES.required;
  else if (!from) errors.dateFrom = MESSAGES.date;

  if (!dateTo) errors.dateTo = MESSAGES.required;
  else if (!to) errors.dateTo = MESSAGES.date;
  else if (from && to < from)
    errors.dateTo = "Završni datum ne može biti prije početnog.";

  return errors;
};

const time = (entry: BlockedAppointments) =>
  parseDate(entry.dateFrom)?.getTime() ?? Number.MAX_SAFE_INTEGER;

const BlockedDatesPage = () => {
  const blocked = useCollections(blockedDatesRepo);
  const appointments = useCollections(appointmentRepo);

  const [deleting, setDeleting] = useState<BlockedAppointments | null>(null);

  const form = useForm<Values>({
    initialValues: { dateFrom: "", dateTo: "" },
    validate,
    onSubmit: async (values, { reset }) => {
      const created = await blocked.create({ ...values, appointmentId: "" });

      if (created) {
        notifySuccess("Datumi su blokirani.");
        reset();
      }
    },
  });

  const names = useMemo(
    () => new Map(appointments.items.map((a) => [a.id, a.fullName])),
    [appointments.items],
  );

  const rows = useMemo(
    () => [...blocked.items].sort((a, b) => time(a) - time(b)),
    [blocked.items],
  );

  const confirmDelete = async () => {
    if (!deleting) return;

    if (await blocked.remove(deleting.id)) {
      notifySuccess("Blokada je uklonjena");
      setDeleting(null);
    }
  };

  return (
    <>
      <PageHeader
        title="Blokirani datumi"
        description="Dani na kojima klijenti ne mogu zatražiti termin. Potvrđeni termini se ovdje dodaju automatski"
      />

      <form
        ref={form.formRef}
        onSubmit={form.handleSubmit}
        noValidate
        className="surface grid w-full gap-4 p-6 md:grid-cols-[1fr_1fr_auto] md:items-start"
      >
        <Field id="dateFrom" label="Od" required error={form.errors.dateFrom}>
          <DatePicker {...form.bind("dateFrom")} />
        </Field>
        <Field
          id="dateTo"
          label="Do (uključivo)"
          required
          error={form.errors.dateTo}
        >
          <DatePicker {...form.bind("dateTo")} />
        </Field>
        <Button
          type="submit"
          variant="primary"
          className="md:mt-9"
          loading={form.submitting}
        >
          Blokiraj
        </Button>
      </form>

      <CollectionState
        status={blocked.status}
        error={blocked.error}
        onRetry={blocked.reload}
        isEmpty={rows.length === 0}
        emptyMessage="Trenutno nema blokiranih datuma."
      >
        <TableShell>
          <HeadRow>
            <Th>Od</Th>
            <Th>Do</Th>
            <Th>Razlog</Th>
            <Th className="text-right">Akcije</Th>
          </HeadRow>
          <tbody>
            {rows.map((entry) => (
              <BodyRow key={entry.id}>
                <Td className="whitespace-nowrap">{entry.dateFrom}</Td>
                <Td className="whitespace-nowrap">{entry.dateTo}</Td>
                <Td>
                  {entry.appointmentId
                    ? `Termin: ${names.get(entry.appointmentId) ?? "nepoznat klijent"}`
                    : "Ručno blokiran"}
                </Td>
                <Td>
                  <div className="flex justify-end">
                    <Button
                      variant="secondary"
                      className="px-3 py-2 text-sm"
                      onClick={() => setDeleting(entry)}
                    >
                      Ukloni
                    </Button>
                  </div>
                </Td>
              </BodyRow>
            ))}
          </tbody>
        </TableShell>
      </CollectionState>

      <ConfirmDialog
        open={deleting !== null}
        title="Ukloni blokadu"
        confirmLabel="Ukloni"
        loading={deleting !== null && blocked.pendingId === deleting.id}
        onClose={() => setDeleting(null)}
        onConfirm={confirmDelete}
      >
        <p>
          Datumi {deleting?.dateFrom} – {deleting?.dateTo} opet će biti dostupni
          za rezervaciju.
          {deleting?.appointmentId &&
            " Termin povezan s ovom blokadom ostaje potvrđen."}
        </p>
      </ConfirmDialog>
    </>
  );
};

export default BlockedDatesPage;

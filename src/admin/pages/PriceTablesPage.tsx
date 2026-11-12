import { useMemo, useState } from "react";

import CollectionState from "../components/CollectionState";
import ConfirmDialog from "../components/ConfirmDialog";
import PageHeader from "../components/PageHeader";
import StatusBadge from "../components/StatusBadge";
import { BodyRow, HeadRow, TableShell, Td, Th } from "../components/Table";

import { priceTableRepo } from "../data/repositories";
import { useCollections } from "../data/useCollections";

import Button from "../../components/ui/Button";

import { formatDateValue, getTime } from "../../utils/date";
import { notifySuccess } from "../../utils/toast";

import type { PriceTableType } from "../../types/data";

const isLink = (value: string) => /^https?:\/\//.test(value);

const PriceTablesPage = () => {
  const tables = useCollections(priceTableRepo);

  const [deleting, setDeleting] = useState<PriceTableType | null>(null);

  const rows = useMemo(
    () =>
      [...tables.items].sort(
        (a, b) => getTime(b.createdAt) - getTime(a.createdAt),
      ),
    [tables.items],
  );

  const makeCurrent = async (table: PriceTableType) => {
    const previous = tables.items.filter(
      (t) => t.isCurrent && t.id !== table.id,
    );

    if (!(await tables.update(table.id, { isCurrent: true }))) return;

    for (const item of previous) {
      await tables.update(item.id, { isCurrent: false });
    }

    notifySuccess("Aktualni cjenik je promjenjen");
  };

  const confirmDelete = async () => {
    if (!deleting) return;

    if (await tables.remove(deleting.id)) {
      notifySuccess("Cijenik je obrisan");
      setDeleting(null);
    }
  };

  return (
    <>
      <PageHeader
        title="Cjenici"
        description="Arhiva cjenika koju posjetitelji mogu preuzeti. Označite koji je trenutno aktualan"
      />

      <p className="surface w-full p-3 text-sm font-light text-gray-light">
        Dodavanje novog cjenika (prijenos CSV datoteke u Firebase Storage) još
        nije povezano.
      </p>

      <CollectionState
        status={tables.status}
        error={tables.error}
        onRetry={tables.reload}
        isEmpty={rows.length === 0}
        emptyMessage="Još nema cjenika"
      >
        <TableShell>
          <HeadRow>
            <Th>Naziv</Th>
            <Th>Datum</Th>
            <Th>Stauts</Th>
            <Th className="text-right">Akcije</Th>
          </HeadRow>
          <tbody>
            {rows.map((table) => (
              <BodyRow key={table.id}>
                <Td className="font-medium">{table.name}</Td>
                <Td className="whitespace-nowrap">
                  {formatDateValue(table.createdAt)}
                </Td>
                <Td>
                  {table.isCurrent ? (
                    <StatusBadge tone="success">Aktualan</StatusBadge>
                  ) : (
                    <StatusBadge>Arhiviran</StatusBadge>
                  )}
                </Td>
                <Td>
                  <div className="flex flex-wrap justify-end gap-3">
                    {isLink(table.downloadLink) && (
                      <Button
                        variant="secondary"
                        className="px-3 py-2 text-sm"
                        href={table.downloadLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Otvori
                      </Button>
                    )}
                    {!table.isCurrent && (
                      <>
                        <Button
                          variant="primary"
                          className="px-3 py-2 text-sm"
                          loading={tables.pendingId === table.id}
                          onClick={() => makeCurrent(table)}
                        >
                          Postavi kao aktualan
                        </Button>
                        <Button
                          variant="secondary"
                          className="px-3 py-2 text-sm"
                          onClick={() => setDeleting(table)}
                        >
                          Obriši
                        </Button>
                      </>
                    )}
                  </div>
                </Td>
              </BodyRow>
            ))}
          </tbody>
        </TableShell>
      </CollectionState>

      <ConfirmDialog
        open={deleting !== null}
        title="Obrisati cjenik?"
        confirmLabel="Obriši"
        loading={deleting !== null && deleting.id === tables.pendingId}
        onClose={() => setDeleting(null)}
        onConfirm={confirmDelete}
      >
        <p>
          „{deleting?.name}” bit će uklonjen iz arhive. Datoteka u Firebase
          Storageu ostaje dok je ne obrišete ručno.
        </p>
      </ConfirmDialog>
    </>
  );
};

export default PriceTablesPage;

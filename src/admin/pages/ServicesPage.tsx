import { useMemo, useState } from "react";

import CollectionState from "../components/CollectionState";
import ConfirmDialog from "../components/ConfirmDialog";
import PageHeader from "../components/PageHeader";
import StatusBadge, { type Tone } from "../components/StatusBadge";
import { BodyRow, HeadRow, TableShell, Td, Th } from "../components/Table";
import { serviceRepo } from "../data/repositories";
import { useCollections } from "../data/useCollections";

import ServiceEditor from "./ServiceEditor";

import Button from "../../components/ui/Button";

import { notifySuccess } from "../../utils/toast";

import type { ServiceDataType } from "../../types/data";

const STATUS: Record<ServiceDataType["status"], { label: string; tone: Tone }> =
  {
    active: { label: "Aktivna", tone: "success" },
    hidden: { label: "Skrivena", tone: "neutral" },
    archived: { label: "Arhivirana", tone: "warning" },
  };

const ServicesPage = () => {
  const services = useCollections(serviceRepo);

  const [editing, setEditing] = useState<ServiceDataType | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editorKey, setEditorKey] = useState(0);
  const [deleting, setDeleting] = useState<ServiceDataType | null>(null);

  const rows = useMemo(
    () => [...services.items].sort((a, b) => a.sortOrder - b.sortOrder),
    [services.items],
  );

  const nextSortOrder = rows.length
    ? Math.max(...rows.map((s) => s.sortOrder)) + 1
    : 0;

  const openEditor = (service: ServiceDataType | null) => {
    setEditing(service);
    setEditorKey((key) => key + 1);
    setEditorOpen(true);
  };

  const save = async (
    data: Omit<ServiceDataType, "id">,
    id?: string,
  ): Promise<boolean> => {
    const ok = id
      ? await services.update(id, data)
      : (await services.create(data)) !== null;

    if (ok) notifySuccess(id ? "Usluga je spremljena." : "Usluga je dodana.");

    return ok;
  };

  const confirmDelete = async () => {
    if (!deleting) return;

    if (await services.remove(deleting.id)) {
      notifySuccess("Usluga je obrisana.");
      setDeleting(null);
    }
  };

  return (
    <>
      <PageHeader
        title="Usluge"
        description="Usluge i cijene koje se prikazuju na stranici. Samo aktivne usluge su javno vidljive."
        actions={
          <Button variant="primary" onClick={() => openEditor(null)}>
            Nova usluga
          </Button>
        }
      />

      <CollectionState
        status={services.status}
        error={services.error}
        onRetry={services.reload}
        isEmpty={rows.length === 0}
        emptyMessage="Još nema usluga. Dodajte prvu."
      >
        <TableShell>
          <HeadRow>
            <Th>Naziv</Th>
            <Th>Status</Th>
            <Th>Cijena (auto)</Th>
            <Th>Redoslijed</Th>
            <Th className="text-right">Akcije</Th>
          </HeadRow>
          <tbody>
            {rows.map((s) => (
              <BodyRow key={s.id}>
                <Td>
                  <p className="font-medium">{s.title}</p>
                  {s.isFeatured && (
                    <p className="text-sm text-gray-light">Istaknuta</p>
                  )}
                </Td>
                <Td>
                  <StatusBadge tone={STATUS[s.status].tone}>
                    {STATUS[s.status].label}
                  </StatusBadge>
                </Td>
                <Td className="whitespace-nowrap tabular-nums">
                  €{s.prices.car.price}
                </Td>
                <Td className="tabular-nums">{s.sortOrder}</Td>
                <Td>
                  <div className="flex flex-wrap justify-end gap-2">
                    <Button
                      variant="secondary"
                      className="px-3 py-2 text-sm"
                      onClick={() => openEditor(s)}
                    >
                      Uredi
                    </Button>
                    <Button
                      variant="secondary"
                      className="px-3 py-2 text-sm"
                      loading={services.pendingId === s.id}
                      onClick={() => setDeleting(s)}
                    >
                      Obriši
                    </Button>
                  </div>
                </Td>
              </BodyRow>
            ))}
          </tbody>
        </TableShell>
      </CollectionState>

      <ServiceEditor
        key={editorKey}
        open={editorOpen}
        service={editing}
        existingSlugs={rows
          .filter((s) => s.id !== editing?.id)
          .map((s) => s.slug)}
        nextSortOrder={nextSortOrder}
        onClose={() => setEditorOpen(false)}
        onSave={save}
      />

      <ConfirmDialog
        open={deleting !== null}
        title="Obrisati uslugu?"
        confirmLabel="Obriši"
        loading={deleting !== null && services.pendingId === deleting.id}
        onClose={() => setDeleting(null)}
        onConfirm={confirmDelete}
      >
        <p>
          „{deleting?.title}” bit će trajno obrisana. Ako je samo želite sakriti
          s stranice, umjesto brisanja je uredite i postavite status na
          „Skrivena”.
        </p>
      </ConfirmDialog>
    </>
  );
};

export default ServicesPage;

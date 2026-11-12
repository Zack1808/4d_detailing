import { useMemo, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa6";

import CollectionState from "../components/CollectionState";
import ConfirmDialog from "../components/ConfirmDialog";
import FilterTabs from "../components/FilterTabs";
import PageHeader from "../components/PageHeader";
import StatusBadge from "../components/StatusBadge";

import { reviewsRepo } from "../data/repositories";
import { useCollections } from "../data/useCollections";

import Button from "../../components/ui/Button";

import { notifySuccess } from "../../utils/toast";

import type { ReviewType } from "../../types/data";

type Filter = "pending" | "approved" | "all";

const Stars = ({ count }: { count: number }) => (
  <div role="img" aria-label={`Ocjena ${count} od 5`} className="flex gap-1">
    {[1, 2, 3, 4, 5].map((star) =>
      star <= count ? (
        <FaStar key={star} aria-hidden="true" />
      ) : (
        <FaRegStar key={star} aria-hidden="true" />
      ),
    )}
  </div>
);

const ReviewsPage = () => {
  const reviews = useCollections(reviewsRepo);

  const [filter, setFilter] = useState<Filter>("pending");
  const [deleting, setDeleting] = useState<ReviewType | null>(null);

  const counts = useMemo(
    () => ({
      pending: reviews.items.filter((r) => !r.isApproved).length,
      approved: reviews.items.filter((r) => r.isApproved).length,
      all: reviews.items.length,
    }),
    [reviews.items],
  );

  const rows = reviews.items.filter(
    (r) =>
      filter === "all" ||
      (filter === "approved" ? r.isApproved : !r.isApproved),
  );

  const toggle = async (review: ReviewType) => {
    const next = !review.isApproved;

    if (await reviews.update(review.id, { isApproved: next })) {
      notifySuccess(next ? "Recenzija je odobrena" : "Recenzija je povučena");
    }
  };

  const confirmDelete = async () => {
    if (!deleting) return;

    if (await reviews.remove(deleting.id)) {
      notifySuccess("Recenzija je obrisana");
      setDeleting(null);
    }
  };

  return (
    <>
      <PageHeader
        title="Recenzije"
        description="Recenzije klijenata. Na stranici su vidljive samo odobrene"
      />

      <FilterTabs
        label="Filter recenzija"
        value={filter}
        onChange={setFilter}
        options={[
          { value: "pending", label: "Na čekanju", count: counts.pending },
          { value: "approved", label: "Odobrene", count: counts.approved },
          { value: "all", label: "Sve", count: counts.all },
        ]}
      />

      <CollectionState
        status={reviews.status}
        error={reviews.error}
        onRetry={reviews.reload}
        isEmpty={rows.length === 0}
        emptyMessage="Nema recenzija za odabrani filer"
      >
        <ul className="flex flex-col gap-3">
          {rows.map((review) => (
            <li key={review.id} className="surface flex flex-col gap-3 p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">
                    {review.name} {review.surname}
                  </p>
                  <Stars count={review.starCount} />
                </div>
                <StatusBadge tone={review.isApproved ? "success" : "warning"}>
                  {review.isApproved ? "Odobrena" : "Na čekanju"}
                </StatusBadge>
              </div>

              <p className="max-w-[85ch] font-light">{review.review}</p>

              <div className="flex flex-wrap gap-2">
                <Button
                  variant={review.isApproved ? "secondary" : "primary"}
                  className="px-3 py-2 text-sm"
                  loading={reviews.pendingId === review.id}
                  onClick={() => toggle(review)}
                >
                  {review.isApproved ? "Povuci" : "Odobri"}
                </Button>
                <Button
                  variant="secondary"
                  className="px-3 py-2 text-sm"
                  onClick={() => setDeleting(review)}
                >
                  Obriši
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </CollectionState>

      <ConfirmDialog
        open={deleting !== null}
        title="Obrisati recenziju"
        confirmLabel="Obriši"
        loading={deleting !== null && reviews.pendingId === deleting.id}
        onClose={() => setDeleting(null)}
        onConfirm={confirmDelete}
      >
        <p>
          Recenzija korisnika {deleting?.name} {deleting?.surname} bit će trajno
          obrisana.
        </p>
      </ConfirmDialog>
    </>
  );
};

export default ReviewsPage;

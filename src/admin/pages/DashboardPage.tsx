import { Link } from "react-router-dom";

import CollectionState from "../components/CollectionState";
import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";
import { DashboardSkeleton } from "../components/skeletons";

import { getAppointmentState } from "../data/appointmentActions";
import { useCollections } from "../data/useCollections";
import {
  appointmentRepo,
  reviewsRepo,
  serviceRepo,
} from "../data/repositories";

import { ADMIN_PATHS } from "../paths";

import { parseDate, toMidnight } from "../../utils/date";

import type { AppointmentType } from "../../types/data";

const UPCOMING_LIMIT = 5;

const time = (appointment: AppointmentType) =>
  parseDate(appointment.dateFrom)?.getTime() ?? Number.MAX_SAFE_INTEGER;

const AppointmentList = ({
  title,
  items,
  empty,
}: {
  title: string;
  items: AppointmentType[];
  empty: string;
}) => (
  <section className="surface flex flex-1 flex-col gap-3 p-6">
    <div className="flex items-center justify-between gap-3">
      <h2 className="text-xl font-semibold">{title}</h2>
      <Link
        to={ADMIN_PATHS.appointments}
        className="text-sm underline underline-offset-4"
      >
        Svi termini
      </Link>
    </div>

    {items.length === 0 ? (
      <p className="font-light text-gray-light">{empty}</p>
    ) : (
      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex flex-col gap-1 border-t border-gray-light/20 pt-3 first:border-t-0 first:pt-0"
          >
            <span className="font-medium">
              {item.dateFrom} · {item.fullName}
            </span>
            <span className="text-sm font-light text-gray-light">
              {item.service} - {item.vehicle}
            </span>
          </li>
        ))}
      </ul>
    )}
  </section>
);

const DashboardPage = () => {
  const appointments = useCollections(appointmentRepo);
  const reviews = useCollections(reviewsRepo);
  const services = useCollections(serviceRepo);

  const loading = [appointments, reviews, services].some(
    (c) => c.status === "loading",
  );
  const failed = [appointments, reviews, services].find(
    (c) => c.status === "error",
  );

  const today = toMidnight(new Date()).getTime();

  const pending = appointments.items
    .filter((a) => getAppointmentState(a) === "pending")
    .sort((a, b) => time(a) - time(b));

  const upcoming = appointments.items
    .filter((a) => getAppointmentState(a) === "confirmed" && time(a) >= today)
    .sort((a, b) => time(a) - time(b));

  const reviewsToApprove = reviews.items.filter((r) => !r.isApproved).length;
  const activeServices = services.items.filter(
    (s) => s.status === "active",
  ).length;

  const retry = () => {
    appointments.reload();
    reviews.reload();
    services.reload();
  };

  return (
    <>
      <PageHeader
        title="Pregled"
        description="Što čeka vašu pažnju i što je slijedeće na rasporedu"
      />

      <CollectionState
        status={failed ? "error" : loading ? "loading" : "ready"}
        error={failed?.error ?? null}
        onRetry={retry}
        skeleton={<DashboardSkeleton />}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <StatCard
            label="Zahtjevi na čekanju"
            value={pending.length}
            to={ADMIN_PATHS.appointments}
          />
          <StatCard
            label="Predstojeći termini"
            value={upcoming.length}
            to={ADMIN_PATHS.appointments}
          />
          <StatCard
            label="Recenzije za odobrenje"
            value={reviewsToApprove}
            to={ADMIN_PATHS.reviews}
          />
          <StatCard
            label="Aktivne usluge"
            value={activeServices}
            to={ADMIN_PATHS.services}
          />
        </div>

        <div className="flex flex-col gap-3 xl:flex-row">
          <AppointmentList
            title="Zahtjevi na čekanju"
            items={pending.slice(0, UPCOMING_LIMIT)}
            empty="Nema novih zahtjeva"
          />
        </div>

        <AppointmentList
          title="Sljedeći termini"
          items={upcoming.slice(0, UPCOMING_LIMIT)}
          empty="Nema potvrđenih termina."
        />

        <section className="surface flex flex-col gap-3 p-6">
          <h2>Posjeti stranice</h2>
          <p className="max-w-[70ch] font-light text-gray-light">
            Ovdje će se prikazivati sažetak posjeta iz Google Analyticsa.
            Kartica još nije povezana s podacima.
          </p>
        </section>
      </CollectionState>
    </>
  );
};

export default DashboardPage;

import React, { useState, useEffect } from "react";
import { FaArrowTrendUp, FaArrowRight } from "react-icons/fa6";

import SEO from "@shared/components/SEO";
import Button from "@shared/components/Button";

import Container from "@/shared/components/Container";

import { useAdminService } from "@features/admin/context/ServiceContext";
import { useAnalytics } from "@features/analytics/hooks/useAnalytics";
import { useAppointments } from "@/features/booking/hooks/useAppointments";

import CircularProgress from "@features/admin/components/CircularProgress";
import BarProgress from "@features/admin/components/BarProgress";
import Spinner from "@features/admin/components/Spinner";
import SkeletonLoader from "../components/Skeletonloader";
import AppointmentTable from "../components/AppintmentTable";

import type { AnalyticsType } from "@features/analytics/types";
import type { AppointmentType } from "@/features/booking/types";

const PAGE_LABELS: Record<string, string> = {
  "/": "Početna",
  "/usluge": "Usluge",
  "/kontakt": "Kontakt",
  "/pravila-privatnosti": "Pravila privatnosti",
  "/uvijeti-koristenja": "Uvijeti korištenja",
};

const MOCK_PAGES = Array.from({ length: 5 }, (_, i) => ({
  path: `/mock-${i}`,
  views: 0,
}));

const MOCK_APPOINTMENTS = Array.from({ length: 5 }, (_, i) => ({
  id: `vaserafdasdrfads-${i}`,
  fullName: "Test Test",
  email: "test@gmal.com",
  phone: "+385950000000",
  service: "Luxury+ Paket",
  vehicle: "Ford Fiesta 2017",
  dateFrom: "15.10.2026",
  dateTo: "17.10.2026",
  remark: "",
  isConfirmed: true,
  isBlocked: true,
}));

const Dashboard: React.FC = () => {
  const [analytics, setAnalytics] = useState<AnalyticsType>();
  const [analyticsLoading, setAnalyticsLoading] = useState<boolean>(true);
  const [appointments, setAppointments] = useState<AppointmentType[]>([]);
  const [appointmentsLoading, setAppointmentsLoading] = useState<boolean>(true);

  const { loading, services } = useAdminService();
  const { getAnalytics } = useAnalytics();
  const { getAppointments } = useAppointments();

  useEffect(() => {
    const fetchAnalytics = async () => {
      setAnalyticsLoading(true);
      try {
        const data = await getAnalytics();

        if (!data) throw Error("No data fetched");

        setAnalytics(data);
      } catch (err: unknown) {
        console.error(err);
      } finally {
        setAnalyticsLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  useEffect(() => {
    const fetchAppointments = async () => {
      setAppointmentsLoading(true);
      try {
        const data = await getAppointments();

        if (!data) throw Error("No appointments fetched");

        setAppointments(data);
      } catch (err: unknown) {
        console.error(err);
      } finally {
        setAppointmentsLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <main className="md:px-9 flex-1">
      <SEO title="4D Detailing | Admin Dashboard" />

      <Container className="pb-0!">
        <h1 className="text-dark dark:text-light text-4xl font-semibold">
          Dobrodošao, Luka
        </h1>
      </Container>

      <Container className="pb-0!">
        <h2 className="text-dark dark:text-light font-semibold text-2xl">
          Analitika
        </h2>
        <div className="flex flex-col w-full gap-6">
          <div className="flex w-full lg:flex-row flex-col gap-3">
            <div className="flex flex-1 bg-gray-light/15 dark:bg-gray-dark/40 p-6 rounded-xs gap-6 flex-col justify-between">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-dark dark:text-light text-xl">Pregledi</h3>

                <small className="text-gray-500 dark:text-gray-400">
                  Zadnjih 30 dana
                </small>
              </div>
              <div className="flex gap-6">
                <div className="flex-1/5 flex flex-col gap-6 justify-center">
                  <p className="text-md text-gray-500 dark:text-gray-400 font-light flex flex-col text-sm">
                    Ukupno pregleda
                    <SkeletonLoader loading={analyticsLoading}>
                      <strong className="text-dark dark:text-light font-semibold text-5xl">
                        {analytics ? analytics.summary.totalVisits : "0"}
                      </strong>
                    </SkeletonLoader>
                  </p>
                  <SkeletonLoader loading={analyticsLoading}>
                    <p className="text-dark dark:text-light text-sm">
                      <FaArrowTrendUp className="text-xl inline-block mr-3" />
                      <strong>12%</strong> u odnosu na prethodno razdoblje
                    </p>
                  </SkeletonLoader>
                </div>
                <SkeletonLoader loading={analyticsLoading} circle>
                  <CircularProgress
                    value={analytics ? analytics.summary.uniqueVisitors : 0}
                    max={analytics ? analytics.summary.totalVisits : 0}
                    label="Novi posjetitelji"
                    className="flex-1 max-w-42"
                  >
                    <span className="text-gray-500 dark:text-gray-400 text-xs flex flex-col">
                      <strong className="text-3xl text-dark dark:text-light">
                        {analytics
                          ? Math.round(
                              (analytics.summary.uniqueVisitors /
                                analytics.summary.totalVisits) *
                                100,
                            )
                          : "0"}
                        %
                      </strong>
                      Novih
                    </span>
                  </CircularProgress>
                </SkeletonLoader>
              </div>
              <div className="flex gap-3 border-t border-gray-500 dark:border-gray-400 pt-6 ">
                <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-1">
                  <span className="p-1.5 rounded-full bg-dark dark:bg-light aspect-square" />
                  Novi posjetitelji:{" "}
                  <SkeletonLoader loading={analyticsLoading}>
                    <strong className="text-dark dark:text-light">
                      {analytics ? analytics.summary.uniqueVisitors : 123}
                    </strong>
                  </SkeletonLoader>
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-1">
                  <span className="p-1.5 rounded-full bg-dark/20 dark:bg-light/20 aspect-square" />
                  Povratni:{" "}
                  <SkeletonLoader loading={analyticsLoading}>
                    <strong className="text-dark dark:text-light">
                      {analytics
                        ? analytics.summary.totalVisits -
                          analytics.summary.uniqueVisitors
                        : 123}
                    </strong>
                  </SkeletonLoader>
                </p>
              </div>
            </div>
            <div className="flex flex-1 flex-col bg-gray-light/15 dark:bg-gray-dark/40 p-6 gap-6 rounded-xs">
              <div className="flex flex-1 items-baseline justify-between gap-3">
                <h3 className="text-dark dark:text-light text-xl">
                  Pregledi po stranicama
                </h3>

                <small className="text-gray-500 dark:text-gray-400">
                  Zadnjih 30 dana
                </small>
              </div>
              <div className="flex flex-col justify-between h-full gap-3">
                {analyticsLoading
                  ? MOCK_PAGES.map(() => (
                      <SkeletonLoader loading={analyticsLoading}>
                        <BarProgress max={0} value={0} label="početna">
                          <div className="flex-1 flex justify-between mb-1 text-xs">
                            <p className="flex gap-3">
                              Početna{" "}
                              <span className="text-gray-500 dark:text-gray-400">
                                /
                              </span>
                            </p>
                            <p>
                              182{" "}
                              <span className="text-gray-500 dark:text-gray-400">
                                50%
                              </span>
                            </p>
                          </div>
                        </BarProgress>
                      </SkeletonLoader>
                    ))
                  : analytics?.topPages.map((page) => (
                      <BarProgress
                        max={analytics ? analytics.summary.totalVisits : 0}
                        value={page.views}
                        label={PAGE_LABELS[page.path] as string}
                      >
                        <div className="flex-1 flex justify-between mb-1 text-xs">
                          <p className="flex gap-3">
                            {PAGE_LABELS[page.path]}{" "}
                            <span className="text-gray-500 dark:text-gray-400">
                              {page.path}
                            </span>
                          </p>
                          <p>
                            {page.views}{" "}
                            <span className="text-gray-500 dark:text-gray-400">
                              {Math.round(
                                (page.views / analytics.summary.totalVisits) *
                                  100,
                              )}
                              %
                            </span>
                          </p>
                        </div>
                      </BarProgress>
                    ))}
              </div>
              <div className="flex gap-3 border-t border-gray-500 dark:border-gray-400 pt-6 mt-auto justify-end">
                <Button to="/admin/analitika" className="p-0! text-sm!">
                  Vidi više <FaArrowRight />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Container className="pb-0!">
        <div className="flex w-full justify-between gap-3 items-center">
          <h2 className="text-dark dark:text-light font-medium text-xl">
            Nadolazeći termini
          </h2>
          <Button to="/admin/termini" className="text-sm">
            Vidi više <FaArrowRight />
          </Button>
        </div>
        <SkeletonLoader loading={appointmentsLoading} className="w-full">
          <AppointmentTable
            appointments={
              appointmentsLoading ? MOCK_APPOINTMENTS : appointments
            }
          />
        </SkeletonLoader>
      </Container>

      <Container className="pb-0!">
        <div className="flex w-full justify-between gap-3 items-center">
          <h2 className="text-dark dark:text-light font-medium text-xl">
            Recenzije
          </h2>
          <Button to="/admin/recenzije" className="text-sm">
            Vidi više <FaArrowRight />
          </Button>
        </div>
      </Container>

      <Container className="pb-0!">
        <div className="flex w-full justify-between gap-3 items-center">
          <h2 className="text-dark dark:text-light font-medium text-xl">
            Usluge
          </h2>
          <Button to="/admin/usluge" className="text-sm">
            Vidi više <FaArrowRight />
          </Button>
        </div>
        {loading ? <Spinner size="xl" className="mx-auto" /> : services.length}
      </Container>
    </main>
  );
};

export default Dashboard;

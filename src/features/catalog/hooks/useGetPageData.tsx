import { useState, useCallback } from "react";

import { catalogApi } from "@/features/catalog/api/catalogApi";

import { MOCK_CONFIG } from "@/config/mockConfig";

import { type ServiceDataType, type ReviewType } from "../types";

import { type AppointmentType } from "@/features/booking/types";

type useGetPageDataType = (useMockData?: boolean) => {
  error: string | null;
  setReview: (review: Omit<ReviewType, "id">) => Promise<boolean | undefined>;
  setAppointment: (review: Omit<AppointmentType, "id">) => void;
  getPageData: () => Promise<
    | {
        services: ServiceDataType[];
        reviews: ReviewType[];
        appointments: AppointmentType[];
      }
    | undefined
  >;
};

const loadCatalogMockData = () => import("@/features/catalog/mock/catalogMock");
const loadAppointmentMockData = () =>
  import("@/features/booking/mock/appointmentsMock");

export const useGetPageData: useGetPageDataType = (
  useMockData = MOCK_CONFIG.enableMockData,
) => {
  const [error, setError] = useState<string | null>(null);

  const setReview = useCallback(
    async (review: Omit<ReviewType, "id">) => {
      setError(null);

      try {
        if (useMockData) {
          await new Promise((resolve) =>
            setTimeout(resolve, MOCK_CONFIG.apiDelay),
          );

          return true;
        }

        const id = await catalogApi.setData<ReviewType>("reviews", review);

        if (id) return true;

        return false;
      } catch (err: unknown) {
        console.error("setReview failed: ", err);
        setError(err instanceof Error ? err.message : "Nešto je pošlo po zlu!");
        return false;
      } finally {
      }
    },
    [useMockData],
  );

  const setAppointment = useCallback(
    async (data: Omit<AppointmentType, "id">) => {
      setError(null);

      try {
        if (useMockData) {
          await new Promise((resolve) =>
            setTimeout(resolve, MOCK_CONFIG.apiDelay),
          );
        }

        await catalogApi.setData<AppointmentType>("appointments", data);
      } catch (err) {
        console.error("setAppointment failed: ", err);
        setError(err instanceof Error ? err.message : "Nešto je pošlo po zlu!");
      } finally {
      }
    },
    [useMockData],
  );

  const getPageData = useCallback(async () => {
    setError(null);

    try {
      if (useMockData) {
        const [{ mockServices, mockReviews }, { mockAppointments }] =
          await Promise.all([
            loadCatalogMockData(),
            loadAppointmentMockData(),
            new Promise((resolve) => setTimeout(resolve, MOCK_CONFIG.apiDelay)),
          ]);

        return {
          services: mockServices,
          reviews: mockReviews,
          appointments: mockAppointments,
        };
      }

      const services = await catalogApi.getData<ServiceDataType>("services");
      const reviews = await catalogApi.getData<ReviewType>("reviews", [
        {
          field: "isApproved",
          operator: "==",
          value: true,
        },
      ]);
      const appointments = await catalogApi.getData<AppointmentType>(
        "appointments",
        [
          {
            field: "isBlocked",
            operator: "==",
            value: true,
          },
        ],
      );

      return {
        services,
        reviews,
        appointments,
      };
    } catch (err: unknown) {
      console.error("getPageData failed: ", err);
      setError(err instanceof Error ? err.message : "Nešto je pošlo po zlu!");
    } finally {
    }
  }, [useMockData]);

  return {
    error,
    setReview,
    getPageData,
    setAppointment,
  };
};

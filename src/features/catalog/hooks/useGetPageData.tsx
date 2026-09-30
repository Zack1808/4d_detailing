import { useState, useCallback } from "react";

import { catalogApi } from "../api/catalogApi";
import { appointmentApi } from "@/features/booking/api/appointmentsApi";

import { MOCK_CONFIG } from "@/config/mockConfig";

import type { ServiceType, ReviewType, NewReviewType } from "../types";

import type {
  AppointmentType,
  NewAppointmentType,
} from "@/features/booking/types";

type useGetPageDataType = (useMockData?: boolean) => {
  error: string | null;
  setReview: (review: NewReviewType) => Promise<boolean | undefined>;
  setAppointment: (review: NewAppointmentType) => void;
  getPageData: () => Promise<
    | {
        services: ServiceType[];
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
    async (review: NewReviewType) => {
      setError(null);

      try {
        if (useMockData) {
          await new Promise((resolve) =>
            setTimeout(resolve, MOCK_CONFIG.apiDelay),
          );

          return true;
        }

        const id = await catalogApi.addReview(review);

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
    async (data: NewAppointmentType) => {
      setError(null);

      try {
        if (useMockData) {
          await new Promise((resolve) =>
            setTimeout(resolve, MOCK_CONFIG.apiDelay),
          );
        }

        await appointmentApi.addAppointment(data);
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

      const services = await catalogApi.getServices();
      const reviews = await catalogApi.getReviews();
      const appointments = await appointmentApi.getAppointments();

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

import { useState, useCallback } from "react";

import { firebaseApi } from "@features/catalog/api/firebaseApi";

import { MOCK_CONFIG } from "@/config/mockConfig";

import { type ServiceDataType, type ReviewType } from "../types";

import { type AppointmentType } from "@/features/booking/types";

type useGetPageDataType = (useMockData?: boolean) => {
  error: string | null;
  getServices: () => Promise<ServiceDataType[] | undefined>;
  getAppointments: () => Promise<AppointmentType[] | undefined>;
  getReviews: () => Promise<ReviewType[] | undefined>;
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

const loadMockData = () => import("@features/catalog/mock/mockData");

export const useGetPageData: useGetPageDataType = (
  useMockData = MOCK_CONFIG.enableMockData,
) => {
  const [error, setError] = useState<string | null>(null);

  const getServices = useCallback(async () => {
    setError(null);

    try {
      if (useMockData) {
        const [{ mockServices }] = await Promise.all([
          loadMockData(),
          new Promise((resolve) => setTimeout(resolve, MOCK_CONFIG.apiDelay)),
        ]);

        return mockServices;
      }

      const services = await firebaseApi.getData<ServiceDataType>("services");

      return services;
    } catch (err: unknown) {
      console.error("getService failed: ", err);
      setError(err instanceof Error ? err.message : "Nešto je pošlo po zlu!");
    } finally {
    }
  }, [useMockData]);

  const getAppointments = useCallback(async () => {
    setError(null);

    try {
      if (useMockData) {
        const [{ mockAppointments }] = await Promise.all([
          loadMockData(),
          new Promise((resolve) => setTimeout(resolve, MOCK_CONFIG.apiDelay)),
        ]);

        return mockAppointments;
      }

      const appointments = await firebaseApi.getData<AppointmentType>(
        "appointments",
        [
          {
            field: "isBlocked",
            operator: "==",
            value: true,
          },
        ],
      );

      return appointments;
    } catch (err: unknown) {
      console.error("getAppointments failed: ", err);
      setError(err instanceof Error ? err.message : "Nešto je pošlo po zlu!");
    } finally {
    }
  }, [useMockData]);

  const getReviews = useCallback(async () => {
    setError(null);

    try {
      if (useMockData) {
        const [{ mockReviews }] = await Promise.all([
          loadMockData(),
          new Promise((resolve) => setTimeout(resolve, MOCK_CONFIG.apiDelay)),
        ]);

        return mockReviews;
      }

      const reviews = await firebaseApi.getData<ReviewType>("reviews", [
        {
          field: "isApproved",
          operator: "==",
          value: true,
        },
      ]);

      return reviews;
    } catch (err: unknown) {
      console.error("getReviews failed: ", err);
      setError(err instanceof Error ? err.message : "Nešto je pošlo po zlu!");
    } finally {
    }
  }, [useMockData]);

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

        const id = await firebaseApi.setData<ReviewType>("reviews", review);

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

        await firebaseApi.setData<AppointmentType>("appointments", data);
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
        const [{ mockServices, mockReviews, mockAppointments }] =
          await Promise.all([
            loadMockData(),
            new Promise((resolve) => setTimeout(resolve, MOCK_CONFIG.apiDelay)),
          ]);

        return {
          services: mockServices,
          reviews: mockReviews,
          appointments: mockAppointments,
        };
      }

      const services = await firebaseApi.getData<ServiceDataType>("services");
      const reviews = await firebaseApi.getData<ReviewType>("reviews", [
        {
          field: "isApproved",
          operator: "==",
          value: true,
        },
      ]);
      const appointments = await firebaseApi.getData<AppointmentType>(
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
    getServices,
    getAppointments,
    getReviews,
    setReview,
    getPageData,
    setAppointment,
  };
};

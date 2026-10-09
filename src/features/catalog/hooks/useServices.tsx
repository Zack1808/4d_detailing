import { useCallback } from "react";

import { catalogApi } from "../api/catalogApi";

import { MOCK_CONFIG } from "@/config/mockConfig";

import type { ServiceType, NewServiceType } from "../types";

type useServicesType = (useMockData?: boolean) => {
  getServices: () => Promise<ServiceType[] | undefined>;
  addService: (service: NewServiceType) => Promise<void>;
  updateService: (id: string, service: ServiceType) => Promise<void>;
  deleteService: (id: string) => Promise<void>;
};

const loadMockServices = () => import("@/features/catalog/mock/catalogMock");

export const useServices: useServicesType = (
  useMockData = MOCK_CONFIG.enableMockData,
) => {
  const getServices = useCallback(async () => {
    try {
      if (useMockData) {
        const [{ mockServices }] = await Promise.all([
          loadMockServices(),
          new Promise((resolve) => setTimeout(resolve, MOCK_CONFIG.apiDelay)),
        ]);

        return mockServices;
      }

      const services = await catalogApi.getServices();

      return services;
    } catch (err: unknown) {
      console.error("getService failed: ", err);
    }
  }, [useMockData]);

  const addService = useCallback(
    async (service: NewServiceType) => {
      console.log(service);
    },
    [useMockData],
  );

  const updateService = useCallback(
    async (id: string, service: NewServiceType) => {
      console.log(id, service);
    },
    [useMockData],
  );

  const deleteService = useCallback(
    async (id: string) => {
      console.log(id);
    },
    [useMockData],
  );

  return {
    getServices,
    addService,
    updateService,
    deleteService,
  };
};

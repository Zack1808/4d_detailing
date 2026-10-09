import React, { useContext, useState, useEffect } from "react";

import { useGetPageData } from "@/features/catalog/hooks/useGetPageData";

import type { ServiceType } from "@/features/catalog/types";

type AdminServiceContextType = {
  services: ServiceType[];
};

type AdminServiceProviderProps = {
  children: React.ReactNode;
};

const AdminServiceContext = React.createContext<
  AdminServiceContextType | undefined
>(undefined);

export const useAdminService = () => {
  const context = useContext(AdminServiceContext);

  if (!context) {
    throw new Error("useAdminService must be used within a DataProvider");
  }

  return context;
};

export const AdminServiceProvider = ({
  children,
}: AdminServiceProviderProps) => {
  const [service, setService] = useState<ServiceType[]>([]);
};

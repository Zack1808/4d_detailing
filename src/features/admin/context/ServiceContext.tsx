import React, { useContext, useState, useEffect } from "react";

import { useServices } from "@/features/catalog/hooks/useServices";

import type { ServiceType } from "@/features/catalog/types";

type AdminServiceContextType = {
  services: ServiceType[];
  loading: boolean;
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
  const [services, setServices] = useState<ServiceType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { getServices } = useServices();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const data = await getServices();

        if (data === undefined) return;

        setServices(data);
      } catch (err: unknown) {
        console.error("getPageData failed:", err);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return (
    <AdminServiceContext.Provider value={{ services, loading }}>
      {children}
    </AdminServiceContext.Provider>
  );
};

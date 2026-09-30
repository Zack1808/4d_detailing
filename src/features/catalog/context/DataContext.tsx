import React, { useState, useContext, useEffect } from "react";

import PageLoader from "@/shared/components/PageLoader";

import { useGetPageData } from "../hooks/useGetPageData";

import { useTheme } from "@/shared/context/ThemeContext";

import type { ServiceType, ReviewType } from "../types";

import type { AppointmentType } from "@/features/booking/types";

type DataContextType = {
  services: ServiceType[];
  reviews: ReviewType[];
  appointments: AppointmentType[];
};

type DataProviderType = {
  children: React.ReactNode;
};

const DataContext = React.createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }

  return context;
};

export const DataProvider = ({ children }: DataProviderType) => {
  const [services, setServices] = useState<ServiceType[]>([]);
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [appointments, setAppointments] = useState<AppointmentType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showLoader, setShowLoader] = useState<boolean>(true);

  const { getPageData } = useGetPageData();

  const { isDark } = useTheme();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const data = await getPageData();

        if (data === undefined) return;

        setServices(data.services);
        setReviews(data.reviews);
        setAppointments(data.appointments);
      } catch (err) {
        console.error("getPageData failed:", err);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => setShowLoader(false), 700);

      return () => clearTimeout(timer);
    }
  }, [loading]);

  return (
    <DataContext.Provider value={{ services, reviews, appointments }}>
      {showLoader && (
        <PageLoader
          isDark={isDark}
          className={` ${
            loading
              ? "opacity-100"
              : "opacity-0 pointer-events-none transition-opacity duration-700"
          }`}
        />
      )}
      {!loading && children}
    </DataContext.Provider>
  );
};

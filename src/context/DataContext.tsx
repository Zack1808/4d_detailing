import React, { useState, useContext, useEffect } from "react";

import PageLoader from "../components/layout/PageLoader";

import { useGetPageData } from "../hooks/useGetPageData";

import { type ServiceDataType, type ReviewType } from "../types/data";

type DataContextType = {
  isDark: boolean;
  services: ServiceDataType[];
  reviews: ReviewType[];
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
  const [services, setServices] = useState<ServiceDataType[]>([]);
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [showLoader, setShowLoader] = useState<boolean>(true);
  const [isDark, setIsDark] = useState<boolean>(
    window.matchMedia("(prefers-color-scheme: dark)").matches,
  );

  const { pageLoading, getPageData } = useGetPageData();

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getPageData();

        if (data === undefined) return;

        setServices(data.services);
        setReviews(data.reviews);
      } catch (err) {}
    };

    getData();
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const updateTheme = () => {
      setIsDark(mediaQuery.matches);
    };

    updateTheme();

    mediaQuery.addEventListener("change", updateTheme);

    return () => {
      mediaQuery.removeEventListener("change", updateTheme);
    };
  }, []);

  useEffect(() => {
    if (!pageLoading) {
      const timer = setTimeout(() => setShowLoader(false), 700);

      return () => clearTimeout(timer);
    }
  }, [pageLoading]);

  return (
    <DataContext.Provider value={{ isDark, services, reviews }}>
      {showLoader && (
        <PageLoader
          isDark={isDark}
          className={` ${
            pageLoading
              ? "opacity-100"
              : "opacity-0 pointer-events-none transition-opacity duration-700"
          }`}
        />
      )}
      {children}
    </DataContext.Provider>
  );
};

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
  return useContext(DataContext);
};

export const DataProvider = ({ children }: DataProviderType) => {
  const [services, setServices] = useState<ServiceDataType[]>([]);
  const [reviews, setReviews] = useState<ReviewType[]>([]);

  const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

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

  return (
    <DataContext.Provider value={{ isDark, services, reviews }}>
      {pageLoading ? <PageLoader isDark={isDark} /> : children}
    </DataContext.Provider>
  );
};

import React, { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";

import PageLoader from "../components/layout/PageLoader";

import { useGetPageData } from "../hooks/useGetPageData";

import type {
  ServiceDataType,
  ReviewType,
  BlockedAppointments,
  PriceTableType,
} from "../types/data";

import type { SEOProps } from "../types/components";

import SEO from "../components/common/SEO";

type DataContextType = {
  isDark: boolean;
  services: ServiceDataType[];
  reviews: ReviewType[];
  blockedAppointments: BlockedAppointments[];
  priceArchive: PriceTableType[];
};

type DataProviderType = {
  children: React.ReactNode;
};

const CANONICAL: Record<string, SEOProps> = {
  "/": {
    title:
      "4D Detailing Velika Gorica – Profesionalno čišćenje i poliranje vozila",
    description:
      "4D Detailing – profesionalne usluge čišćenja, poliranja i zaštite vozila u Velikoj Gorici.",
    canonical: "https://4d-detailing.hr/",
  },
  "/usluge": {
    title:
      "Usluge Detailinga – Pranje, Poliranje i Zaštita Vozila | 4D Detailing",
    canonical: "https://4d-detailing.hr/usluge",
  },
  "/kontakt": {
    title: "Kontakt | 4D Detailing Velika Gorica",
    canonical: "https://4d-detailing.hr/kontakt",
  },
  "/uvijeti-koristenja": {
    title: "Uvjeti korištenja | 4D Detailing",
    canonical: "https://4d-detailing.hr/uvijeti-koristenja",
  },
  "/pravila-privatnosti": {
    title: "Pravila privatnosti | 4D Detailing",
    canonical: "https://4d-detailing.hr/pravila-privatnosti",
  },
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
  const [blockedAppointments, setBlockedAppointments] = useState<
    BlockedAppointments[]
  >([]);
  const [priceArchive, setPriceArchive] = useState<PriceTableType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showLoader, setShowLoader] = useState<boolean>(true);
  const [isDark, setIsDark] = useState<boolean>(
    window.matchMedia("(prefers-color-scheme: dark)").matches,
  );

  const { getPageData } = useGetPageData();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const data = await getPageData();

        if (data === undefined) return;

        setServices(data.services);
        setReviews(data.reviews);
        setBlockedAppointments(data.blockedAppointments);
        setPriceArchive(data.priceArchive);
      } catch (err) {
        console.error("getPageData failed:", err);
      } finally {
        setLoading(false);
      }
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
    if (!loading) {
      const timer = setTimeout(() => setShowLoader(false), 700);

      return () => clearTimeout(timer);
    }
  }, [loading]);

  const { pathname } = useLocation();

  const config = CANONICAL[pathname];

  return (
    <DataContext.Provider
      value={{ isDark, services, reviews, blockedAppointments, priceArchive }}
    >
      <SEO {...config} />
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

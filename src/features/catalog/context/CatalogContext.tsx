import React, { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";

import PageLoader from "@/shared/components/PageLoader";
import SEO, { type SEOProps } from "@/shared/components/SEO";

import { useServices } from "../hooks/useServices";
import { useReviews } from "../hooks/useReview";

import { useTheme } from "@/shared/context/ThemeContext";

import type { ServiceType, ReviewType } from "../types";

type DataContextType = {
  services: ServiceType[];
  reviews: ReviewType[];
};

type DataProviderType = {
  children: React.ReactNode;
};

const CatalogContext = React.createContext<DataContextType | undefined>(
  undefined,
);

export const useCatalog = () => {
  const context = useContext(CatalogContext);

  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }

  return context;
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

export const CatalogProvider = ({ children }: DataProviderType) => {
  const [services, setServices] = useState<ServiceType[]>([]);
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showLoader, setShowLoader] = useState<boolean>(true);

  const { getServices } = useServices();
  const { getReviews } = useReviews();

  const { isDark } = useTheme();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const data = await Promise.all([getServices(), getReviews()]);

        if (data === undefined) return;

        setServices(data[0] as ServiceType[]);
        setReviews(data[1] as ReviewType[]);
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

  const { pathname } = useLocation();

  const config = CANONICAL[pathname];

  return (
    <CatalogContext.Provider value={{ services, reviews }}>
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
    </CatalogContext.Provider>
  );
};

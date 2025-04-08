import React, { useContext, useReducer, useEffect } from "react";

import { useHome } from "../firebaseFunctions/homeFetch";
import { useServices } from "../firebaseFunctions/servicesFetch";
import { useAbout } from "../firebaseFunctions/aboutFetch";
import { useContact } from "../firebaseFunctions/contactFetch";

const StoreContext = React.createContext();

export const ACTIONS = {
  LOADING: "LOADING",
  SET_HERO_DATA: "SET_HERO_DATA",
  SET_SERVICES_DATA: "SET_SERVICES_DATA",
  SET_REVIEWS_DATA: "SET_REVIEWS_DATA",
  SET_EXTERIOR_CONTENT: "SET_EXTERIOR_CONTENT",
  SET_EXTERIOR_LIST: "SET_EXTERIOR_LIST",
  SET_INTERIOR_CONTENT: "SET_INTERIOR_CONTENT",
  SET_INTERIOR_LIST: "SET_INTERIOR_LIST",
  SET_POLISH_CONTENT: "SET_POLISH_CONTENT",
  SET_POLISH_LIST: "SET_POLISH_LIST",
  SET_PACKAGES_CONTENT: "SET_PACKAGES_CONTENT",
  SET_PACKAGES_LIST: "SET_PACKAGES_LIST",
  SET_ABOUT_HEADER_DATA: "SET_ABOUT_HEADER_DATA",
  SET_ABOUT_DATA: "SET_ABOUT_DATA",
  SET_CONTACT_DATA: "SET_CONTACT_DATA",
};

export const useStore = () => {
  return useContext(StoreContext);
};

const initialState = {
  loading: true,
  heroData: {},
  servicesData: {},
  reviewsData: {},
  exteriorContent: {},
  exteriorList: [],
  interiorContent: {},
  interiorList: [],
  polishContent: {},
  polishList: [],
  packagesContent: {},
  packagesList: [],
  aboutHeader: {},
  aboutData: [],
  contactData: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.LOADING:
      return { ...state, loading: action.payload };
    case ACTIONS.SET_HERO_DATA:
      return { ...state, heroData: action.payload };
    case ACTIONS.SET_SERVICES_DATA:
      return { ...state, servicesData: action.payload };
    case ACTIONS.SET_REVIEWS_DATA:
      return { ...state, reviewsData: action.payload };
    case ACTIONS.SET_SECTION_LOADING:
      return { ...state, sectionLoading: action.payload };
    case ACTIONS.SET_EXTERIOR_CONTENT:
      return { ...state, exteriorContent: action.payload };
    case ACTIONS.SET_EXTERIOR_LIST:
      return { ...state, exteriorList: action.payload };
    case ACTIONS.SET_INTERIOR_CONTENT:
      return { ...state, interiorContent: action.payload };
    case ACTIONS.SET_INTERIOR_LIST:
      return { ...state, interiorList: action.payload };
    case ACTIONS.SET_POLISH_CONTENT:
      return { ...state, polishContent: action.payload };
    case ACTIONS.SET_POLISH_LIST:
      return { ...state, polishList: action.payload };
    case ACTIONS.SET_PACKAGES_CONTENT:
      return { ...state, packagesContent: action.payload };
    case ACTIONS.SET_PACKAGES_LIST:
      return { ...state, packagesList: action.payload };
    case ACTIONS.SET_ABOUT_HEADER_DATA:
      return { ...state, aboutHeader: action.payload };
    case ACTIONS.SET_ABOUT_DATA:
      return { ...state, aboutData: action.payload };
    case ACTIONS.SET_CONTACT_DATA:
      return { ...state, contactData: action.payload };
    default:
      return { ...state };
  }
};

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { getHero, getServices, getReviewsContet } = useHome();
  const {
    getExteriorData,
    getExteriorList,
    getInteriorData,
    getInteriorList,
    getPolishData,
    getPolishList,
    getPackagesData,
    getPackagesList,
  } = useServices();
  const { getAboutHeader, getAboutContent } = useAbout();
  const { getContact } = useContact();

  useEffect(() => {
    const retrieveData = async () => {
      dispatch({ type: ACTIONS.LOADING, payload: true });
      try {
        const heroD = await getHero(dispatch);
        const servicesD = await getServices(dispatch);
        await getReviewsContet(dispatch);
        const exteriorD = await getExteriorData(dispatch);
        await getExteriorList(dispatch);
        const interiorD = await getInteriorData(dispatch);
        await getInteriorList(dispatch);
        const polishD = await getPolishData(dispatch);
        await getPolishList(dispatch);
        const packagesD = await getPackagesData(dispatch);
        await getPackagesList(dispatch);
        const aboutHeaderD = await getAboutHeader(dispatch);
        const aboutContentD = await getAboutContent(dispatch);
        const contactD = await getContact(dispatch);

        await new Promise((r) => setTimeout(r, 0));

        const imageUrls = [];

        if (heroD?.heroBigBg) imageUrls.push(heroD.heroBigBg);
        if (heroD?.heroSmallBg) imageUrls.push(heroD.heroSmallBg);
        servicesD.services.map((service) => {
          if (service?.imageUrl) imageUrls.push(service.imageUrl);
        });
        if (exteriorD?.contentImg) imageUrls.push(exteriorD.contentImg);
        if (exteriorD?.headerImg) imageUrls.push(exteriorD.headerImg);
        if (interiorD?.contentImg) imageUrls.push(interiorD.contentImg);
        if (interiorD?.headerImg) imageUrls.push(interiorD.headerImg);
        if (polishD?.contentImg) imageUrls.push(polishD.contentImg);
        if (polishD?.headerImg) imageUrls.push(polishD.headerImg);
        if (packagesD?.contentImg) imageUrls.push(packagesD.contentImg);
        if (packagesD?.headerImg) imageUrls.push(packagesD.headerImg);
        if (aboutHeaderD?.headerImg) imageUrls.push(aboutHeaderD.headerImg);
        aboutContentD.map((item) => {
          if (item?.imageUrl) imageUrls.push(item.imageUrl);
        });
        if (contactD?.headerImg) imageUrls.push(contactD.headerImg);

        const preloadImages = imageUrls.map(
          (src) =>
            new Promise((resolve, reject) => {
              const img = new Image();
              img.src = src;
              img.onload = resolve;
              img.onerror = reject;
            })
        );

        await Promise.all(preloadImages);
      } catch (err) {
        console.log(err);
      } finally {
        dispatch({ type: ACTIONS.LOADING, payload: false });
      }
    };

    retrieveData();
  }, []);

  return (
    <StoreContext.Provider value={{ ...state }}>
      {children}
    </StoreContext.Provider>
  );
};

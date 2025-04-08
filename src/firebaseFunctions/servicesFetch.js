import { useCallback } from "react";
import { getDocs, getDoc, doc, collection } from "firebase/firestore";

import { ACTIONS } from "../context/storeContext";

import { db } from "../firebaseConfig";

export const useServices = () => {
  const getExteriorData = useCallback(async (dispatch) => {
    const docRef = doc(db, "exterior", "content");

    const docSnap = await getDoc(docRef);

    dispatch({ type: ACTIONS.SET_EXTERIOR_CONTENT, payload: docSnap.data() });

    return docSnap.data();
  });

  const getExteriorList = useCallback(async (dispatch) => {
    const coll = collection(db, "exteriorList");

    const docSnap = await getDocs(coll);

    const data = docSnap.docs.map((doc) => {
      const {
        price,
        services,
        title,
        discount,
        hasDiscount,
        info,
        priceSuv,
        priceTransporter,
      } = doc.data();

      return {
        id: doc.id,
        price,
        services,
        title,
        discount,
        hasDiscount,
        info,
        priceSuv,
        priceTransporter,
      };
    });
    dispatch({ type: ACTIONS.SET_EXTERIOR_LIST, payload: data });
  });

  const getInteriorData = useCallback(async (dispatch) => {
    const docRef = doc(db, "interior", "content");

    const docSnap = await getDoc(docRef);

    dispatch({ type: ACTIONS.SET_INTERIOR_CONTENT, payload: docSnap.data() });

    return docSnap.data();
  });

  const getInteriorList = useCallback(async (dispatch) => {
    const coll = collection(db, "interiorList");

    const docSnap = await getDocs(coll);

    const data = docSnap.docs.map((doc) => {
      const {
        price,
        services,
        title,
        discount,
        hasDiscount,
        info,
        priceSuv,
        priceTransporter,
      } = doc.data();

      return {
        id: doc.id,
        price,
        services,
        title,
        discount,
        hasDiscount,
        info,
        priceSuv,
        priceTransporter,
      };
    });
    dispatch({ type: ACTIONS.SET_INTERIOR_LIST, payload: data });
  });

  const getPolishData = useCallback(async (dispatch) => {
    const docRef = doc(db, "polish", "content");

    const docSnap = await getDoc(docRef);

    dispatch({ type: ACTIONS.SET_POLISH_CONTENT, payload: docSnap.data() });

    return docSnap.data();
  });

  return {
    getExteriorData,
    getExteriorList,
    getInteriorData,
    getInteriorList,
    getPolishData,
  };
};

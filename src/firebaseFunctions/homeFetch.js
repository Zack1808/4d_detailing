import { useCallback } from "react";
import { getDocs, getDoc, doc, collection } from "firebase/firestore";

import { ACTIONS } from "../context/storeContext";

import { db } from "../firebaseConfig";

export const useHome = () => {
  const getHero = useCallback(async (dispatch) => {
    try {
      const docRef = doc(db, "home", "hero");

      const docSnap = await getDoc(docRef);

      dispatch({ type: ACTIONS.SET_HERO_DATA, payload: docSnap.data() });

      return docSnap.data();
    } catch (err) {
      console.log(err);
    }
  });

  const getServices = useCallback(async (dispatch) => {
    const docRef = doc(db, "home", "services");

    const docSnap = await getDoc(docRef);

    dispatch({ type: ACTIONS.SET_SERVICES_DATA, payload: docSnap.data() });

    return docSnap.data();
  });

  const getReviewsContet = useCallback(async (dispatch) => {
    const docRef = doc(db, "home", "reviews");

    const docSnap = await getDoc(docRef);

    dispatch({ type: ACTIONS.SET_REVIEWS_DATA, payload: docSnap.data() });
  });

  return { getHero, getServices, getReviewsContet };
};

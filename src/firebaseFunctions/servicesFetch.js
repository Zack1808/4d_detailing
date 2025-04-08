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

  return { getExteriorData };
};

import { useCallback } from "react";
import { getDoc, doc } from "firebase/firestore";

import { ACTIONS } from "../context/storeContext";

import { db } from "../firebaseConfig";

export const useAbout = () => {
  const getAboutHeader = useCallback(async (dispatch) => {
    const docRef = doc(db, "aboutHeader", "content");

    const docSnap = await getDoc(docRef);

    dispatch({
      type: ACTIONS.SET_ABOUT_HEADER_DATA,
      payload: docSnap.data(),
    });

    return docSnap.data();
  });

  return {
    getAboutHeader,
  };
};

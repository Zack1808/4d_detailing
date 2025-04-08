import { useCallback } from "react";
import { getDoc, doc } from "firebase/firestore";

import { ACTIONS } from "../context/storeContext";

import { db } from "../firebaseConfig";

export const useContact = () => {
  const getContact = useCallback(async (dispatch) => {
    const docRef = doc(db, "contactHeader", "content");

    const docSnap = await getDoc(docRef);

    dispatch({
      type: ACTIONS.SET_CONTACT_DATA,
      payload: docSnap.data(),
    });

    return docSnap.data();
  });

  return { getContact };
};

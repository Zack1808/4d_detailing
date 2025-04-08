import { useCallback } from "react";
import {
  getDoc,
  doc,
  getDocs,
  collection,
  query,
  orderBy,
} from "firebase/firestore";

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

  const getAboutContent = useCallback(async (dispatch) => {
    const coll = collection(db, "aboutContent");

    const q = query(coll, orderBy("createdOn", "asc"));

    const docsSnap = await getDocs(q);

    const data = docsSnap.docs.map((doc) => {
      const { title, content, imageUrl, forwardLink, createdOn } = doc.data();
      return {
        id: doc.id,
        content,
        imageUrl,
        title,
        forwardLink,
        createdOn,
      };
    });

    dispatch({ type: ACTIONS.SET_ABOUT_DATA, payload: data });

    return data;
  });

  return {
    getAboutHeader,
    getAboutContent,
  };
};

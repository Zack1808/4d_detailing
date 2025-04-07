import { useState, useCallback } from "react";
import { getDocs, getDoc, doc, collection } from "firebase/firestore";

import { db } from "../firebaseConfig";

export const useHome = () => {
  const [hero, setHero] = useState({});

  const getHero = useCallback(async () => {
    try {
      const docRef = doc(db, "home", "hero");

      const docSnap = await getDoc(docRef);

      setHero(docSnap.data());
    } catch (err) {
      console.log(err);
    }
  });

  return { getHero, hero };
};

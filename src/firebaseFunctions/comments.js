import { useState, useCallback } from "react";
import {
  getDocs,
  addDoc,
  doc,
  query,
  where,
  collection,
} from "firebase/firestore";

import { db } from "../firebaseConfig";

export const useComments = () => {
  const [comments, setComments] = useState([]);

  const getComments = useCallback(async () => {
    const commentQuery = query(
      collection(db, "reviews"),
      where("isApproved", "==", true)
    );

    const querySnapshot = await getDocs(commentQuery);

    const commentData = querySnapshot.docs.map((doc) => {
      const { user, comment, stars } = doc.data();
      return {
        user,
        comment,
        stars,
      };
    });

    setComments(commentData);
  }, []);

  return { getComments, comments };
};

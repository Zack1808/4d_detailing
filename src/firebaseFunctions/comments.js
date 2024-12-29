import { useState, useCallback } from "react";
import {
  getDocs,
  addDoc,
  doc,
  query,
  where,
  collection,
} from "firebase/firestore";
import { toast } from "react-toastify";

import { db } from "../firebaseConfig";

export const useComments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const addComment = useCallback(
    async (stars, user, comment, additionalFunction) => {
      setLoading(true);
      try {
        await addDoc(collection(db, "reviews"), {
          user,
          comment,
          stars,
          isApproved: false,
        });

        toast.success("Recenzija uspješno poslana", { theme: "dark" });
      } catch (error) {
        toast.error("Slanje recenzije nije uspjelo", { theme: "dark" });
      } finally {
        setLoading(false);
        additionalFunction();
      }
    },
    []
  );

  return { getComments, comments, loading, addComment };
};

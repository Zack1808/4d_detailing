import {
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  type User,
} from "firebase/auth";

import { doc, getDoc } from "firebase/firestore";

import { db, firebaseApp } from "../../lib/firebase";
import { ApiError } from "../../utils/errors";

import type { AdminUser, AuthApi } from "./types";

const auth = getAuth(firebaseApp);

auth.languageCode = "hr";

const ERROR_MESSAGES: Record<string, string> = {
  "auth/invalid-credential": "Neispravna e-adresa ili lozinka.",
  "auth/invalid-email": "Neispravna e-adresa ili lozinka.",
  "auth/user-not-found": "Neispravna e-adresa ili lozinka.",
  "auth/wrong-password": "Neispravna e-adresa ili lozinka.",
  "auth/too-many-requests":
    "Previše neuspjelih pokušaja. Pokušajte ponovno za nekoliko minuta.",
  "auth/user-disabled": "Ovaj račun je onemogućen.",
  "auth/network-request-failed":
    "Nema internetske veze. Provjerite vezu i pokušajte ponovno.",
};

const NOT_ADMIN_MESSAGE = "Ovaj račun nema administratorske ovlasti.";
const CHECK_FAILED_MESSAGE =
  "Provjera ovlasti nije uspjela. Provjerite vezu i pokušajte ponovno.";

const isAdmin = async (user: User, refresh = false) => {
  const { claims } = await user.getIdTokenResult(refresh);

  if (claims.admin === true) return true;

  return (await getDoc(doc(db, "admins", user.uid))).exists();
};

const toAdminUser = (user: User): AdminUser => ({
  uid: user.uid,
  email: user.email ?? "",
});

export const firebaseAuth: AuthApi = {
  async signIn(email, password) {
    let user: User;

    try {
      ({ user } = await signInWithEmailAndPassword(auth, email, password));
    } catch (error) {
      const code = (error as { code?: string }).code ?? "";

      throw new ApiError(
        ERROR_MESSAGES[code] ?? "Prijava nije uspijela. Pokušajte ponovno",
        401,
      );
    }

    let allowed: boolean;

    try {
      allowed = await isAdmin(user, true);
    } catch (error) {
      console.error("Checking admin rights failed:", error);
      await firebaseSignOut(auth);

      throw new ApiError(CHECK_FAILED_MESSAGE, 503);
    }

    if (!allowed) {
      await firebaseSignOut(auth);

      throw new ApiError(NOT_ADMIN_MESSAGE, 403);
    }

    return toAdminUser(user);
  },

  signOut: () => firebaseSignOut(auth),

  async sendPasswordReset(email) {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      const code = (error as { code?: string }).code ?? "";

      if (code === "auth/user-not-found") return;

      throw new ApiError(
        ERROR_MESSAGES[code] ??
          "Slanje poveznice nije uspjelo. Pokušajte ponovno.",
        400,
      );
    }
  },

  subscribe(callback) {
    return onAuthStateChanged(auth, async (user) => {
      if (!user) return callback(null);

      const allowed = await isAdmin(user).catch((error) => {
        console.error("Checking admin rights failed:", error);

        return false;
      });

      callback(allowed ? toAdminUser(user) : null);
    });
  },
};

import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  type User,
} from "firebase/auth";

import { firebaseApp } from "../../lib/firebase";
import { ApiError } from "../../utils/errors";

import type { AdminUser, AuthApi } from "./types";

const auth = getAuth(firebaseApp);

const ERROR_MESSAGES: Record<string, string> = {
  "auth/invalid-credential": "Neispravna e-adresa ili lozinka.",
  "auth/invalid-email": "Neispravna e-adresa ili lozinka.",
  "auth/user-not-found": "Neispravna e-adresa ili lozinka.",
  "auth/wrong-password": "Neispravna e-adresa ili lozinka.",
  "auth/too-many-requests":
    "Previše neuspjelih pokušaja. Pokušajte ponovno za nekoliko minuta.",
  "auth/network-request-failed":
    "Nema internetske veze. Provjerite vezu i pokušajte ponovno.",
};

const NOT_ADMIN_MESSAGE = "Ovaj račun nema administratorske ovlasti.";

const hasAdminClaim = async (user: User) => {
  const { claims } = await user.getIdTokenResult();

  return claims.admin === true;
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

    if (!(await hasAdminClaim(user))) {
      await firebaseSignOut(auth);

      throw new ApiError(NOT_ADMIN_MESSAGE, 403);
    }

    return toAdminUser(user);
  },

  signOut: () => firebaseSignOut(auth),

  subscribe(callback) {
    return onAuthStateChanged(auth, async (user) => {
      if (!user) return callback(null);

      callback((await hasAdminClaim(user)) ? toAdminUser(user) : null);
    });
  },
};

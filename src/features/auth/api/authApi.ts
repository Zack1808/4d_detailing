// TODO: integrate api

import type { AdminUserType } from "../types";

export const authApi = {
  login: async (email: string, password: string) => {
    console.log(email, password);
  },

  logout: async () => {},

  subscribe: (cb: (user: AdminUserType | null) => void) => {
    console.log(cb);
  },
};

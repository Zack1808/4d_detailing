export type AdminUser = {
  uid: string;
  email: string;
};

export type AuthApi = {
  signIn: (email: string, password: string) => Promise<AdminUser>;
  signOut: () => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
  subscribe: (callback: (user: AdminUser | null) => void) => () => void;
};

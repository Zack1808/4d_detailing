import React, { useCallback, useState } from "react";
import { Navigate } from "react-router-dom";

import Container from "@/shared/components/Container";
import SEO from "@/shared/components/SEO";
import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";

import Tesseract from "@/features/site/components/animated/Tessaract";

import { useTheme } from "@/shared/context/ThemeContext";
import { useAdminAuth } from "@/features/auth/context/AuthContext";

import { notifyError, notifySuccess } from "@/shared/utils/toast";

const Login: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const { isDark } = useTheme();
  const { user, signIn } = useAdminAuth();

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const form = event.currentTarget;

      const values = Object.fromEntries(new FormData(form)) as unknown as {
        email: string;
        password: string;
      };

      setLoading(true);

      try {
        const success = await signIn(values.email, values.password);

        if (success) {
          notifySuccess("Prijava je uspješna");
          return;
        }

        notifyError("Pogrešan email ili lozinka");
      } catch (err: unknown) {
        console.error(err);
        notifyError(
          err instanceof Error ? err.message : "nešto je pošlo po zlu",
        );
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  if (user) return <Navigate to="/admin/dashboard" replace />;

  return (
    <main className="overflow-hidden relative">
      <SEO title="4D Detailing | Admin login" noindex />
      <Tesseract
        size={1700}
        className="absolute contain-strict will-change-transform md:right-40 right-0 -z-50 opacity-15 pointer-events-none top-100 -translate-y-3/7 translate-x-1/2 rotate-z-180"
        thickness={5}
        speed={70}
        isDark={isDark}
      />
      <Tesseract
        size={1700}
        className="absolute contain-strict will-change-transform md:flex hidden -z-50 opacity-15 pointer-events-none top-100 -translate-y-3/7 -translate-x-1/2 rotate-z-180"
        thickness={5}
        speed={70}
        isDark={isDark}
      />

      <Container className="h-dvh bg-gray-dark/15 dark:bg-light/15 backdrop-blur-sm items-center justify-center">
        <form
          className="p-6 bg-[#eeeeee] dark:bg-[#1c2022] mx-auto rounded-xs w-full md:max-w-3xl text-dark dark:text-light flex flex-col gap-3"
          onSubmit={handleSubmit}
        >
          <h2 className="text-3xl font-semibold">Prijava</h2>
          <fieldset className="flex flex-col gap-3 mt-3 w-full">
            <label htmlFor="email" className="font-light">
              Email *
            </label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="admin@gmail.com"
              required
            />
          </fieldset>
          <fieldset className="flex flex-col gap-3 mt-3 w-full">
            <label htmlFor="password" className="font-light">
              Lozinka *
            </label>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="Vaša lozinka"
              required
            />
          </fieldset>
          <fieldset className="flex gap-3 mt-3 self-end">
            <Button variant="secondary" to="/">
              Vrati se na početnu
            </Button>
            <Button variant="primary" loading={loading}>
              Prijavi se
            </Button>
          </fieldset>
        </form>
      </Container>
    </main>
  );
};

export default Login;

import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { FaCircleExclamation } from "react-icons/fa6";

import { useAuth } from "../auth/AuthContext";
import { ADMIN_PATHS } from "../paths";

import { MOCK_CONFIG } from "../../services/mock/config";

import SEO from "../../components/seo/SEO";
import Button from "../../components/ui/Button";
import Field from "../../components/ui/Field";
import Input from "../../components/ui/Input";
import Logo from "../../components/ui/Logo";

import { useForm } from "../../hooks/useForm";

import { getErrorMessage } from "../../utils/errors";
import { MESSAGES, isValidEmail } from "../../validation/rules";

type LoginValues = { email: string; password: string };

const INITIAL: LoginValues = { email: "", password: "" };

const validate = (values: LoginValues) => {
  const errors: Partial<Record<keyof LoginValues, string>> = {};

  if (!values.email.trim()) errors.email = MESSAGES.required;
  else if (!isValidEmail(values.email.trim())) errors.email = MESSAGES.email;

  if (!values.password) errors.password = MESSAGES.required;

  return errors;
};

const LoginPage = () => {
  const { status, signIn } = useAuth();
  const location = useLocation();
  const [formError, setFormError] = useState<string | null>(null);
  const [mockLogin, setMockLogin] = useState<LoginValues | null>(null);

  const { formRef, bind, setMany, submitting, errors, handleSubmit } = useForm({
    initialValues: INITIAL,
    validate,
    onSubmit: async ({ email, password }) => {
      setFormError(null);

      try {
        await signIn(email.trim(), password);
      } catch (error) {
        setFormError(getErrorMessage(error, "Prijava nije uspijela."));
        setMany({ password: "" });
      }
    },
  });

  useEffect(() => {
    if (import.meta.env.DEV && MOCK_CONFIG.enableMockAuth) {
      import("../auth/mockAuth").then((m) => setMockLogin(m.MOCK_ADMIN));
    }
  }, []);

  if (status === "authenticated") {
    const from = (location.state as { from?: { pathname: string } } | null)
      ?.from?.pathname;

    return <Navigate to={from ?? ADMIN_PATHS.root} replace />;
  }

  return (
    <main className="flex min-h-svh items-center justify-center px-6 py-12">
      <SEO title="Prijava | 4D Detailing Admin" noindex />

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        noValidate
        className="surface flex w-full max-w-md flex-col gap-6 p-9"
      >
        <div className="flex flex-col items-start gap-3">
          <Logo width={48} height={48} className="size-12" />
          <h1 className="text-3xl font-bold">Prijava</h1>
        </div>

        {formError && (
          <p
            role="alert"
            className="flex items-start gap-2 text-red-600 dark:text-red-400"
          >
            <FaCircleExclamation className="mt-1 shrink-0" aria-hidden="true" />
            {formError}
          </p>
        )}

        <Field id="email" label="Email" required error={errors.email}>
          <Input
            {...bind("email")}
            type="email"
            autoComplete="username"
            autoFocus
          />
        </Field>

        <Field id="password" label="Lozinka" required error={errors.password}>
          <Input
            {...bind("password")}
            type="password"
            autoComplete="current-password"
          />
        </Field>

        <Button
          type="submit"
          variant="primary"
          className="w-full justify-center"
          loading={submitting}
        >
          Prijavi se
        </Button>

        {mockLogin && (
          <div className="flex flex-col items-start gap-1 rounded-xs bg-amber-400/20 p-3 text-sm">
            <p className="font-semibold">Mock prijava (samo razvoj)</p>
            <p className="font-light break-all">
              {mockLogin.email} / {mockLogin.password}
            </p>
            <Button
              variant="link"
              className="py-0 text-sm"
              onClick={() => {
                setMany(mockLogin);
              }}
            >
              Popuni podatke
            </Button>
          </div>
        )}
      </form>
    </main>
  );
};

export default LoginPage;

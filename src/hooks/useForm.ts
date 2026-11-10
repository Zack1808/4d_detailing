import {
  useCallback,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";

type Values = Record<string, string>;
type Errors<V extends Values> = Partial<Record<keyof V, string>>;

type Helpers<V extends Values> = {
  setFieldErrors: (errors: Errors<V>) => void;
  focusFirstInvalid: () => void;
  reset: () => void;
};

type Options<V extends Values> = {
  initialValues: V;
  validate: (values: V) => Errors<V>;
  onSubmit: (values: V, helpers: Helpers<V>) => Promise<void> | void;
};

export const useForm = <V extends Values>({
  initialValues,
  validate,
  onSubmit,
}: Options<V>) => {
  const [values, setValues] = useState<V>(initialValues);
  const [errors, setErrors] = useState<Errors<V>>({});
  const [submitting, setSubmitting] = useState(false);

  const latest = useRef(values);
  const touched = useRef(new Set<keyof V>());
  const formRef = useRef<HTMLFormElement>(null);

  const validateField = useCallback(
    (name: keyof V, nextValues: V) => {
      const message = validate(nextValues)[name];

      setErrors((current) => {
        const next = { ...current };

        if (message) next[name] = message;
        else delete next[name];

        return next;
      });
    },
    [validate],
  );

  const setValue = useCallback(
    (name: keyof V, value: string) => {
      const nextValues = { ...latest.current, [name]: value };

      setValues(nextValues);

      if (touched.current.has(name) || errors[name]) {
        validateField(name, nextValues);
      }
    },
    [errors, validateField],
  );

  const setMany = useCallback((next: Partial<V>) => {
    latest.current = { ...latest.current, ...next };
    setValues(latest.current);
    setErrors((current) => {
      const remaining = { ...current };

      (Object.keys(next) as (keyof V)[]).forEach((key) => {
        delete remaining[key];
      });

      return remaining;
    });
  }, []);

  const setFieldErrors = useCallback((next: Errors<V>) => setErrors(next), []);

  const focusFirstInvalid = useCallback(() => {
    requestAnimationFrame(() => {
      const element = formRef.current?.querySelector<HTMLElement>(
        '[aria-invalid="true"]',
      );

      element?.scrollIntoView({ behavior: "smooth", block: "center" });
      element?.focus({ preventScroll: true });
    });
  }, []);

  const reset = useCallback(() => {
    touched.current.clear();
    latest.current = initialValues;
    setValues(initialValues);
    setErrors({});
  }, [initialValues]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (submitting) return;

    const found = validate(values);

    setErrors(found);

    if (Object.keys(found).length > 0) {
      (Object.keys(values) as (keyof V)[]).forEach((key) =>
        touched.current.add(key),
      );
      focusFirstInvalid();
      return;
    }

    setSubmitting(true);

    try {
      await onSubmit(values, { setFieldErrors, focusFirstInvalid, reset });
    } finally {
      setSubmitting(false);
    }
  };

  const bind = (name: Extract<keyof V, string>) => ({
    id: name,
    name,
    value: values[name],
    invalid: Boolean(errors[name]),
    "aria-invalid": errors[name] ? (true as const) : undefined,
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
    onChange: (eventOrValue: string | ChangeEvent<{ value: string }>) =>
      setValue(
        name,
        typeof eventOrValue === "string"
          ? eventOrValue
          : eventOrValue.target.value,
      ),
    onBlur: () => {
      touched.current.add(name);
      validateField(name, values);
    },
  });

  return {
    formRef,
    values,
    errors,
    submitting,
    bind,
    setValue,
    setMany,
    setFieldErrors,
    handleSubmit,
    focusFirstInvalid,
    reset,
  };
};

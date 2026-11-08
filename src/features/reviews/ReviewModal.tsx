import { useMemo } from "react";

import Button from "../../components/ui/Button";
import Field from "../../components/ui/Field";
import Input from "../../components/ui/Input";
import Modal from "../../components/ui/Modal";
import StarSelect from "../../components/ui/StarSelect";
import Textarea from "../../components/ui/Textarea";

import { useForm } from "../../hooks/useForm";
import { submitReview } from "../../services/submissions";
import { ApiError, getErrorMessage } from "../../utils/errors";
import { notifyError, notifySuccess } from "../../utils/toast";
import {
  LIMITS,
  validateReview,
  type ReviewValues,
} from "../../validation/rules";

type ReviewModalProps = {
  open: boolean;
  onClose: () => void;
};

const SEND_FAILED = "Recenziju nije moguće poslati. Pokušajte ponovno.";

const ReviewModal = ({ open, onClose }: ReviewModalProps) => {
  const initialValues = useMemo<ReviewValues>(
    () => ({ starCount: "0", name: "", surname: "", review: "" }),
    [],
  );

  const form = useForm<ReviewValues>({
    initialValues,
    validate: validateReview,
    onSubmit: async (values, { setFieldErrors, focusFirstInvalid, reset }) => {
      try {
        await submitReview(values);

        notifySuccess("Recenzija uspješno poslana!");
        reset();
        onClose();
      } catch (error) {
        if (error instanceof ApiError && error.fieldErrors) {
          setFieldErrors(error.fieldErrors);
          focusFirstInvalid();
        }

        notifyError(getErrorMessage(error, SEND_FAILED));
      }
    },
  });

  const { bind, errors, values, submitting } = form;

  const stars = bind("starCount");

  return (
    <Modal open={open} onClose={onClose} title="Ostavite recenziju">
      <form
        ref={form.formRef}
        noValidate
        onSubmit={form.handleSubmit}
        className="mt-6 flex flex-col gap-6"
      >
        <Field id="starCount" label="Ocjena" required error={errors.starCount}>
          <StarSelect
            id="starCount"
            value={Number(values.starCount)}
            onChange={(count) => form.setValue("starCount", String(count))}
            onBlur={stars.onBlur}
            aria-invalid={stars["aria-invalid"]}
            aria-describedby={stars["aria-describedby"]}
          />
        </Field>

        <Field id="name" label="Ime" required error={errors.name}>
          <Input
            {...bind("name")}
            autoComplete="given-name"
            placeholder="Ivan"
            maxLength={LIMITS.name}
          />
        </Field>

        <Field id="surname" label="Prezime" required error={errors.surname}>
          <Input
            {...bind("surname")}
            autoComplete="family-name"
            placeholder="Ivić"
            maxLength={LIMITS.surname}
          />
        </Field>

        <Field
          id="review"
          label="Poruka"
          required
          error={errors.review}
          count={{ current: values.review.length, max: LIMITS.review }}
        >
          <Textarea {...bind("review")} placeholder="Unesite poruku" />
        </Field>

        <Button
          variant="primary"
          type="submit"
          className="self-end"
          loading={submitting}
        >
          Pošalji recenziju
        </Button>
      </form>
    </Modal>
  );
};

export default ReviewModal;

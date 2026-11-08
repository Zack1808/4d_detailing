import { COLLECTIONS } from "../config/collections";

import { sendContactEmail } from "./contactApi";
import { firestoreApi } from "./firestore";
import { USE_MOCK_DATA, wait } from "./pageData";
import { MOCK_CONFIG } from "./mock/config";

import type { NewAppointment, NewReview } from "../types/data";
import type { AppointmentValues, ReviewValues } from "../validation/rules";

const logFailure = (label: string, result: PromiseSettledResult<unknown>) => {
  if (result.status === "rejected")
    console.error(`${label} failed:`, result.reason);
};

export const submitAppointment = async (values: AppointmentValues) => {
  if (USE_MOCK_DATA) return wait(MOCK_CONFIG.apiDelay);

  const record: NewAppointment = {
    fullName: values.fullName,
    email: values.email,
    phone: values.phone,
    service: values.service,
    vehicle: values.vehicle,
    dateFrom: values.dateFrom,
    remark: values.remark,
    isConfirmed: false,
    isBlocked: false,
  };

  const [saved, emailed] = await Promise.allSettled([
    firestoreApi.add(COLLECTIONS.appointments, record),
    sendContactEmail({ type: "appointment", ...values }),
  ]);

  logFailure("Saving appointment", saved);
  logFailure("Sending appointment e-mail", emailed);

  if (saved.status === "rejected" && emailed.status === "rejected") {
    throw emailed.reason;
  }
};

export const submitReview = async (values: ReviewValues) => {
  if (USE_MOCK_DATA) return wait(MOCK_CONFIG.apiDelay);

  const review: NewReview = {
    starCount: Number(values.starCount),
    name: values.name,
    surname: values.surname,
    review: values.review,
    isApproved: false,
  };

  const [saved, emailed] = await Promise.allSettled([
    firestoreApi.add(COLLECTIONS.reviews, review),
    sendContactEmail({ type: "review", ...values }),
  ]);

  logFailure("Sending review notification", emailed);

  if (saved.status === "rejected") throw saved.reason;
};

import { useState } from "react";
import { appointmentApi } from "../api/appointmentsApi";
import { sendNotificationEmails } from "../api/emailService";
import { notifyError, notifySuccess } from "@shared/utils/toast";
import type { NewAppointmentType } from "../types";

export const useSubmitAppointment = () => {
  const [loading, setLoading] = useState(false);

  const submit = async (data: NewAppointmentType): Promise<boolean> => {
    setLoading(true);
    try {
      await appointmentApi.addAppointment(data);

      try {
        await sendNotificationEmails(data);
      } catch (err) {
        console.error("Email notification failed", err);
      }

      notifySuccess("Vaš upit je uspješno poslan!");
      return true;
    } catch (err) {
      notifyError(err instanceof Error ? err.message : "Nešto je pošlo po zlu");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { submit, loading };
};

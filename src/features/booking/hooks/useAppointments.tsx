import { useState, useCallback } from "react";
import { appointmentApi } from "../api/appointmentsApi";
import { sendNotificationEmails } from "../api/emailService";
import { notifyError, notifySuccess } from "@shared/utils/toast";
import type { NewAppointmentType } from "../types";

import { MOCK_CONFIG } from "@/config/mockConfig";

const loadMockAppointmentsData = () =>
  import("@features/booking/mock/appointmentsMock");

export const useAppointments = (useMockData = MOCK_CONFIG.enableMockData) => {
  const [loading, setLoading] = useState(false);

  const submitAppointment = async (
    data: NewAppointmentType,
  ): Promise<boolean> => {
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

  const getAppointments = useCallback(async () => {
    try {
      if (useMockData) {
        const [{ mockAppointments }] = await Promise.all([
          loadMockAppointmentsData(),
          new Promise((resolve) => setTimeout(resolve, MOCK_CONFIG.apiDelay)),
        ]);

        return mockAppointments;
      }

      return [];
    } catch (err: unknown) {
      console.error(err);
    }
  }, [useMockData]);

  return { submitAppointment, loading, getAppointments };
};

import React from "react";

import Button from "@shared/components/Button";

import type { AppointmentType } from "@/features/booking/types";

type AppintmentsTableProps = {
  appointments: AppointmentType[];
};

const AppointmentTable: React.FC<AppintmentsTableProps> = ({
  appointments,
}) => {
  return (
    <div className="flex flex-col gap-3 md:gap-6 w-full bg-gray-light/15 dark:bg-gray-dark/40 p-6 rounded-xs">
      {appointments.length === 0 ? (
        <div className="text-sm text-dark dark:text-light">
          Nema nadolazećih termina.
        </div>
      ) : (
        <>
          <div className="overflow-x-auto md:block hidden">
            <table className="w-full min-w-140 border-collapse text-sm text-dark dark:text-light">
              <thead>
                <tr className="text-left text-xs tracking-wide text-gray-500 dark:text-gray-400">
                  <th className="border-b py-3 pr-3 font-medium">Datum</th>
                  <th className="border-b py-3 pr-3 font-medium">Klijent</th>
                  <th className="border-b py-3 pr-3 font-medium">Usluga</th>
                  <th className="border-b py-3 pr-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td className="whitespace-nowrap border-b border-gray-200 dark:border-gray-500 py-3 pr-3">
                      {appointment.dateFrom}
                    </td>
                    <td className="whitespace-nowrap border-b border-gray-200 dark:border-gray-500 py-3 pr-3">
                      {appointment.fullName}
                    </td>
                    <td className="whitespace-nowrap border-b border-gray-200 dark:border-gray-500 py-3 pr-3">
                      {appointment.service}
                    </td>
                    <td className="whitespace-nowrap border-b border-gray-200 dark:border-gray-500 py-3 pr-3">
                      <Button
                        variant={
                          appointment.isConfirmed ? "primary" : "secondary"
                        }
                        className="py-1.5! text-xs! rounded-full! font-semibold!"
                      >
                        {appointment.isConfirmed ? "Odobren" : "Na čekanju"}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ul className="md:hidden ">
            {appointments.map((appointment) => (
              <li
                key={appointment.id}
                className="flex flex-col gap-3 border-b border-gray-200 dark:border-gray-500 py-3"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {appointment.dateFrom}
                  </span>
                  <Button
                    variant={appointment.isConfirmed ? "primary" : "secondary"}
                    className="py-1.5! text-xs! rounded-full! font-semibold!"
                  >
                    {appointment.isConfirmed ? "Odobren" : "Na čekanju"}
                  </Button>
                </div>
                <span className="text-md font-semibold text-dark dark:text-light">
                  {appointment.fullName}
                </span>
                <span className="text-sm text-dark dark:text-light">
                  {appointment.service}
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default AppointmentTable;

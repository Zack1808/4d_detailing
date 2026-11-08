import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";
import { toast } from "react-toastify";

const toastClasses =
  "rounded-xs! bg-panel! dark:bg-panel-dark! text-dark! dark:text-light!";

export const notifySuccess = (message: string) => {
  toast.success(message, {
    className: toastClasses,
    icon: (
      <FaCircleCheck className="text-green-400! dark:text-green-900! w-full! h-full!" />
    ),
    progressClassName: "bg-green-400! dark:bg-green-900!",
  });
};

export const notifyError = (message: string) => {
  toast.error(message, {
    className: toastClasses,
    autoClose: 6000,
    icon: (
      <FaCircleXmark className="text-red-400! dark:text-red-900! w-full! h-full!" />
    ),
    progressClassName: "bg-red-400! dark:bg-red-900!",
  });
};

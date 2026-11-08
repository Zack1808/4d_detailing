import { useEffect, useState, type RefObject } from "react";

export const usePopoverPlacement = (
  triggerRef: RefObject<HTMLElement | null>,
  popupRef: RefObject<HTMLElement | null>,
  open: boolean,
) => {
  const [dropUp, setDropUp] = useState(false);

  useEffect(() => {
    if (!open) return;

    const update = () => {
      if (!triggerRef.current || !popupRef.current) return;

      const spaceBelow =
        window.innerHeight - triggerRef.current.getBoundingClientRect().bottom;

      setDropUp(popupRef.current.offsetHeight >= spaceBelow);
    };

    update();

    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [open, triggerRef, popupRef]);

  return dropUp;
};

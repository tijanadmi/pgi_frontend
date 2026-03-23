import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        // Ignorišemo klikove unutar MUI picker popper-a / popover-a
        if (
          e.target.closest?.(".MuiPickersPopper-root") ||
          e.target.closest?.(".MuiPopover-root") ||
          e.target.closest?.(".MuiDialog-root") ||           // ako picker koristi dialog na nekim uređajima
          e.target.closest?.('[class*="MuiPickers"]') ||     // šira zaštita
          e.target.closest?.('[role="dialog"]')              // još jedan fallback
        ) {
          return; // ne zatvaramo modal
        }

        if (ref.current && !ref.current.contains(e.target)) {
          handler();
        }
      }

      document.addEventListener("click", handleClick, listenCapturing);

      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [handler, listenCapturing]
  );

  return ref;
}
import { useCallback } from "react";

export default function useCloseByEsc(func) {
  useCallback(() => {
    const handleEscClose = (e) => {
      e.key === "Escape" && func();
    };
    document.addEventListener("keyup", handleEscClose);
    return () => {
      document.removeEventListener("keyup", handleEscClose);
    };
  }, [func]);
}

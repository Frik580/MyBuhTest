export default function useCloseByEsc(func) {
    const handleEscClose = (e) => {
        e.key === "Escape" && func();
      };
      document.addEventListener("keyup", handleEscClose);
      return () => {
        document.removeEventListener("keyup", handleEscClose);
      };
  }

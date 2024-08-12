import { useEffect, useRef, useCallback } from "react";

function useIdleTimer(timeout: number, onIdle: () => void) {
  const timerRef = useRef<number | null>(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = window.setTimeout(onIdle, timeout);
  }, [onIdle, timeout]);

  useEffect(() => {
    const handleActivity = () => {
      resetTimer();
    };

    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keydown", handleActivity);
    window.addEventListener("click", handleActivity);

    resetTimer();

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
      window.removeEventListener("click", handleActivity);
    };
  }, [resetTimer]);

  return resetTimer;
}

export default useIdleTimer;

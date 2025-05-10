import { useEffect } from "react";

type UseCountdownTimerProps = {
  timeLeft: number;
  setIsResendDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
};

export const useCountdownTimer = ({ timeLeft, setIsResendDisabled, setTimeLeft }: UseCountdownTimerProps) => {
  useEffect(() => {
    if (timeLeft <= 0) {
      setIsResendDisabled(false);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, setIsResendDisabled, setTimeLeft]);
};

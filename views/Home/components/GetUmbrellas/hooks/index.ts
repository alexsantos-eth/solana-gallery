import { useEffect, useState } from "react";

/**
 * The `useTimer` function in TypeScript creates a countdown timer that decrements by 1 every second
 * until it reaches 0.
 * @returns The `useTimer` custom hook returns the current value of the timer, which is being
 * decremented by 1 every second until it reaches 0.
 */
const useTimer = () => {
  const [timer, setTimer] = useState(7);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer === 0) return;
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  return { timer, setTimer };
};

export default useTimer;

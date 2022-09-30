import { useRef, useState } from 'react';

export const useTimer = () => {
  const [isIdle, setIdle] = useState(true);
  const [isRunning, setRunning] = useState(false);
  const time = useRef(0);

  const start = () => {
    if (!isIdle || isRunning) {
      console.error('Timer is already started');
      return;
    }

    setIdle(false);
    setRunning(true);
    time.current = Date.now();
  };

  const stop = () => {
    if (isIdle || !isRunning) {
      console.error('Timer is not running');
      return;
    }

    setRunning(false);
    time.current = Date.now() - time.current;
  };

  const reset = () => {
    setIdle(true);
    setRunning(false);
    time.current = 0;
  };

  return {
    isIdle,
    isRunning,
    time: time.current,
    start,
    stop,
    reset,
  };
};

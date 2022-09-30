import { useRef } from 'react';
import { useKey } from 'rooks';

import { Button } from '#components';

type StopTimerButtonProps = {
  stop: () => void;
};

export const StopTimerButton = ({ stop }: StopTimerButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useKey(['Space', 'Enter'], () => buttonRef.current?.click(), {
    eventTypes: ['keyup'],
  });

  return (
    <div className="trainer__action">
      <Button ref={buttonRef} onClick={stop}>
        Stop
      </Button>
    </div>
  );
};

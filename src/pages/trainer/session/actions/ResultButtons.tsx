import {
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
  ChevronDownIcon,
  RefreshIcon,
} from '@heroicons/react/solid';
import { useRef } from 'react';
import { useKey } from 'rooks';

import { Button } from '#components';

type ResultButtonsProps = {
  onRetry: () => void;
  onFailed: () => void;
  onSlow: () => void;
  onGood: () => void;
  loading?: boolean;
};

export const ResultButtons = ({
  onRetry,
  onFailed,
  onSlow,
  onGood,
  loading = false,
}: ResultButtonsProps) => {
  const buttonRetryRef = useRef<HTMLButtonElement>(null);
  const buttonFailedRef = useRef<HTMLButtonElement>(null);
  const buttonSlowRef = useRef<HTMLButtonElement>(null);
  const buttonGoodRef = useRef<HTMLButtonElement>(null);

  const options = { eventTypes: ['keyup'] };
  useKey(['1', 'r'], () => buttonRetryRef.current?.click(), options);
  useKey(['2', 'f'], () => buttonFailedRef.current?.click(), options);
  useKey(['3', 's'], () => buttonSlowRef.current?.click(), options);
  useKey(['4', 'g'], () => buttonGoodRef.current?.click(), options);

  return (
    <div className="trainer__action">
      <Button
        ref={buttonRetryRef}
        variant="tertiary"
        onClick={onRetry}
        danger
        icon={<RefreshIcon />}
      >
        Retry
      </Button>

      <Button
        ref={buttonFailedRef}
        variant="tertiary"
        onClick={onFailed}
        loading={loading}
        icon={<ChevronDoubleDownIcon />}
      >
        Failed
      </Button>

      <Button
        ref={buttonSlowRef}
        variant="tertiary"
        onClick={onSlow}
        loading={loading}
        icon={<ChevronDownIcon />}
      >
        Slow
      </Button>

      <Button
        ref={buttonGoodRef}
        variant="tertiary"
        onClick={onGood}
        loading={loading}
        icon={<ChevronDoubleUpIcon />}
      >
        Good
      </Button>
    </div>
  );
};

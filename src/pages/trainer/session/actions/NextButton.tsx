import { AcademicCapIcon, ClockIcon, FlagIcon } from '@heroicons/react/solid';
import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useKey } from 'rooks';

import { Button, LinkButton } from '#components';

import { useTrainerContext } from '../TrainerProvider';

type NextButtonProps = {
  beforeNext?: () => void;
};

export const NextButton = ({ beforeNext }: NextButtonProps) => {
  const { setSlug } = useParams();
  const { currentCard, nextCardType, next } = useTrainerContext();
  const buttonRef = useRef<HTMLButtonElement>(null);

  useKey(['Space'], () => buttonRef.current?.click(), {
    eventTypes: ['keyup'],
  });

  if (nextCardType) {
    const handleClick = () => {
      beforeNext?.();
      next();
    };

    const label =
      currentCard.type === 'start'
        ? 'Start'
        : nextCardType !== 'end'
        ? 'Next'
        : 'Finish';

    const Icon =
      nextCardType === 'learn' ? (
        <AcademicCapIcon />
      ) : nextCardType === 'test' ? (
        <ClockIcon />
      ) : (
        <FlagIcon />
      );

    return (
      <div className="trainer__action">
        <Button ref={buttonRef} onClick={handleClick} icon={Icon}>
          {label}
        </Button>
      </div>
    );
  } else {
    return (
      <div className="trainer__action">
        <LinkButton to={`/trainer/${setSlug}`}>Back to overview</LinkButton>
      </div>
    );
  }
};

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useSubmitResult } from '#services/trainer';
import { DeckCardRepeat, DeckCardTest, ResultStatus } from '#types/trainer';

import { NextButton } from '../actions/NextButton';
import { ResultButtons } from '../actions/ResultButtons';
import { StopTimerButton } from '../actions/StopTimerButton';
import { useTrainerContext } from '../TrainerProvider';
import { useTimer } from '../useTimer';
import { TestCardContent } from './TestCardContent';

type TestCardProps = { card: DeckCardTest | DeckCardRepeat };

export const TestCard = ({ card }: TestCardProps) => {
  const { setSlug } = useParams();
  const { saveResult, retry } = useTrainerContext();
  const mutation = useSubmitResult(setSlug!);
  const timer = useTimer();

  // Whether the result should be saved to the server or not
  const [shouldSkip, setShouldSkip] = useState(false);

  useEffect(() => {
    timer.start();
  }, [card]);

  // Cards are only submitted when the status is 'good', because times should not be tracked for
  // 'slow' and 'failed' results. Progress, however, is tracked based on the first attempt,
  // which is why repeated cards hold the `initialStatus` property.
  //
  // As a side effect, ending a session early will not save any result for cards that have
  // not yet received a 'good' status. This is considered desired behaviour.
  const onResult = (status: ResultStatus) => () => {
    if (mutation.isLoading) return;

    const result = { prompt: card.prompt, time: timer.time / 1000, status };

    if (status !== 'good') {
      setShouldSkip(true);
      saveResult(result);
      return;
    }

    status = card.type === 'repeat' ? card.initialStatus : status;

    mutation.mutate(
      { algorithm_id: card.id, time: timer.time / 1000, status },
      {
        onSuccess: () => {
          saveResult(result);
        },
        onError: () => {
          toast.error('Failed to save result');
        },
      }
    );
  };

  const onRetry = () => {
    retry();
    setShouldSkip(true);
  };

  const beforeNext = () => {
    setShouldSkip(false);
    mutation.reset();
    timer.reset();
  };

  if (timer.isIdle || timer.isRunning) {
    return (
      <>
        <div
          className="trainer__card trainer__card--test-front"
          onClick={timer.stop}
        >
          {card.prompt}
        </div>

        <StopTimerButton stop={timer.isRunning ? timer.stop : () => {}} />
      </>
    );
  }

  return (
    <>
      <TestCardContent card={card} time={timer.time} />

      {!(mutation.isIdle || mutation.isLoading) || shouldSkip ? (
        <NextButton beforeNext={beforeNext} />
      ) : (
        <ResultButtons
          onRetry={onRetry}
          onFailed={onResult('failed')}
          onSlow={onResult('slow')}
          onGood={onResult('good')}
          loading={mutation.isLoading}
        />
      )}
    </>
  );
};

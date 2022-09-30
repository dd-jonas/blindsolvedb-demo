import { ProgressBar } from '#components';

import { useTrainerContext } from './TrainerProvider';

export const TrainerProgress = () => {
  const { deckSize, sessionSize, currentCard } = useTrainerContext();

  const progress = sessionSize - (currentCard.type === 'end' ? 0 : deckSize);
  const total = sessionSize;

  return (
    <div className="trainer__progress">
      <ProgressBar label="Session progress" value={progress} maxValue={total} />
    </div>
  );
};

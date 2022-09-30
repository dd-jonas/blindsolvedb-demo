import { useTrainerContext } from '../TrainerProvider';
import { EndCard } from './EndCard';
import { LearnCard } from './LearnCard';
import { StartCard } from './StartCard';
import { TestCard } from './TestCard';

export const TrainerCard = () => {
  const { currentCard } = useTrainerContext();

  switch (currentCard.type) {
    case 'start':
      return <StartCard />;
    case 'learn':
      return <LearnCard card={currentCard} />;
    case 'test':
    case 'repeat':
      return <TestCard card={currentCard} />;
    case 'end':
      return <EndCard />;
  }
};

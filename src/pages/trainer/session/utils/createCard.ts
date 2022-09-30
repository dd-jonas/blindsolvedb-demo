import {
  DeckCardLearn,
  DeckCardRepeat,
  DeckCardTest,
  ResultStatus,
} from '#types/trainer';

type Card = { id: number; prompt: string; solution: string };

export const createLearnCard = ({
  id,
  prompt,
  solution,
}: Card): DeckCardLearn => ({ id, prompt, solution, type: 'learn' });

export const createTestCard = ({
  id,
  prompt,
  solution,
}: Card): DeckCardTest => ({ id, prompt, solution, type: 'test' });

export const createRepeatCard = (
  { id, prompt, solution }: Card,
  initialStatus: ResultStatus
): DeckCardRepeat => ({ id, prompt, solution, type: 'repeat', initialStatus });

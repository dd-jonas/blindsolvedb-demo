export type Flashcard = {
  id: number;
  prompt: string;
  solution: string;
};

export type DeckCardType = 'start' | 'learn' | 'test' | 'repeat' | 'end';

export type DeckCardStart = { type: 'start' };
export type DeckCardLearn = Flashcard & { type: 'learn' };
export type DeckCardTest = Flashcard & { type: 'test' };
export type DeckCardRepeat = Flashcard & {
  type: 'repeat';
  initialStatus: ResultStatus;
};
export type DeckCardEnd = { type: 'end' };

export type DeckCard =
  | DeckCardStart
  | DeckCardLearn
  | DeckCardTest
  | DeckCardRepeat
  | DeckCardEnd;

export type ResultStatus = 'failed' | 'slow' | 'good';

export type TrainerResult = {
  prompt: string;
  time: number;
  status: ResultStatus;
};

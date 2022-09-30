import { useMemo, useState } from 'react';

import { TrainerSession } from '#types/api';
import {
  DeckCard,
  DeckCardLearn,
  DeckCardRepeat,
  DeckCardTest,
  TrainerResult,
} from '#types/trainer';
import { shuffle } from '#utils';

import {
  createLearnCard,
  createRepeatCard,
  createTestCard,
} from './utils/createCard';

export const useDeck = (pool: TrainerSession['pool']) => {
  const [deck, setDeck] = useState<{
    learn: DeckCardLearn[];
    test: (DeckCardTest | DeckCardRepeat)[];
    repeat: (DeckCardTest | DeckCardRepeat)[];
  }>({
    learn: pool.filter((card) => card.new).map((card) => createLearnCard(card)),
    test: pool.map((card) => createTestCard(card)),
    repeat: [],
  });

  const [currentCard, setCurrentCard] = useState<DeckCard>({
    type: 'start',
  });

  const [results, setResults] = useState<TrainerResult[]>([]);

  const nextCardType = useMemo(() => {
    if (currentCard.type === 'end') return null;
    if (deck.learn.length > 0) return 'learn';
    if (deck.test.length > 0) return 'test';
    if (deck.repeat.length > 0) return 'test';
    return 'end';
  }, [deck, currentCard]);

  const deckSize = useMemo(() => {
    return deck.learn.length + deck.test.length + deck.repeat.length;
  }, [deck]);
  const [sessionSize, setSessionSize] = useState(deckSize);

  const next = () => {
    if (deckSize === 0) {
      setCurrentCard({ type: 'end' });
      return;
    }

    // First show learn cards
    if (deck.learn.length > 0) {
      setDeck((deck) => ({ ...deck, learn: deck.learn.slice(1) }));
      setCurrentCard(deck.learn[0]);
      return;
    }

    // Iterate over all test cards in random order
    if (deck.test.length > 0) {
      const [randomCard, ...remaining] = shuffle(deck.test);

      setDeck((deck) => ({ ...deck, test: remaining }));
      setCurrentCard(randomCard);
      return;
    }

    // Move repeats to test array
    if (deck.repeat.length > 0) {
      const [randomCard, ...remaining] = shuffle(deck.repeat);

      setDeck((deck) => ({ ...deck, test: remaining, repeat: [] }));
      setCurrentCard(randomCard);
      return;
    }
  };

  const retry = () => {
    if (currentCard.type !== 'test' && currentCard.type !== 'repeat') return;

    const copiedCard = { ...currentCard }; // Copy to trigger state updates
    setDeck((deck) => ({ ...deck, repeat: deck.repeat.concat(copiedCard) }));
    setSessionSize((sessionSize) => sessionSize + 1);
  };

  const saveResult = (result: TrainerResult) => {
    if (currentCard.type !== 'test' && currentCard.type !== 'repeat') return;

    setResults((results) => results.concat(result));

    if (result.status === 'slow' || result.status === 'failed') {
      const repeatCard = createRepeatCard(
        currentCard,
        currentCard.type === 'repeat'
          ? currentCard.initialStatus
          : result.status
      );

      setDeck((deck) => ({ ...deck, repeat: deck.repeat.concat(repeatCard) }));
      setSessionSize((sessionSize) => sessionSize + 1);
    }
  };

  const endSession = () => {
    setCurrentCard({ type: 'end' });
  };

  return {
    currentCard,
    nextCardType,
    next,
    retry,
    deckSize,
    sessionSize,
    results,
    saveResult,
    endSession,
  };
};

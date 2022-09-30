import { useState } from 'react';
import { useKey } from 'rooks';

import { Cube } from '#components';
import { DeckCardRepeat, DeckCardTest } from '#types/trainer';

type TestCardContentProps = {
  card: DeckCardTest | DeckCardRepeat;
  time: number;
};

export const TestCardContent = ({ card, time }: TestCardContentProps) => {
  const [showBack, setShowBack] = useState(false);

  useKey(['Enter'], () => setShowBack(!showBack), {
    eventTypes: ['keyup'],
  });

  return showBack ? (
    <div
      className="trainer__card trainer__card--test-back"
      onClick={() => setShowBack(false)}
    >
      <p>{card.prompt}</p>

      <div className="cubes">
        <p className="cubes__label">Front</p>
        <p className="cubes__label">Back</p>

        <Cube scramble={card.solution} big />
        <Cube scramble={card.solution} big opposite />

        <p className="cubes__explanation">Result after executing algorithm</p>
      </div>

      <p>{card.solution}</p>
    </div>
  ) : (
    <div
      className="trainer__card trainer__card--test-front"
      onClick={() => setShowBack(true)}
    >
      {(time / 1000).toFixed(2)}s
    </div>
  );
};

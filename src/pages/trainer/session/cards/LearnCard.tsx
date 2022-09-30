import { Cube } from '#components';
import { DeckCardLearn } from '#types/trainer';

import { NextButton } from '../actions/NextButton';

type LearnCardProps = { card: DeckCardLearn };

export const LearnCard = ({ card }: LearnCardProps) => {
  return (
    <>
      <div className="trainer__card trainer__card--learn">
        <p>{card.prompt}</p>

        <div className="cubes">
          <p className="cubes__label">Front</p>
          <p className="cubes__label">Back</p>

          <Cube solution={card.solution} big />
          <Cube solution={card.solution} big opposite />
        </div>

        <p>{card.solution}</p>
      </div>

      <NextButton />
    </>
  );
};

import { createContext, useContext } from 'react';

import { TrainerSession } from '#types/api';

import { TrainerCard } from './cards/TrainerCard';
import { TrainerEndButton } from './TrainerEndButton';
import { TrainerProgress } from './TrainerProgress';
import { useDeck } from './useDeck';

const TrainerContext = createContext<ReturnType<typeof useDeck> | null>(null);

type TrainerProviderProps = {
  title: string;
  pool: TrainerSession['pool'];
};

export const TrainerProvider = ({ title, pool }: TrainerProviderProps) => {
  const deck = useDeck(pool);

  return (
    <TrainerContext.Provider value={deck}>
      <section className="trainer">
        <div className="trainer__header">
          <h2 className="trainer__title">{title}</h2>

          <TrainerEndButton />
        </div>

        <TrainerProgress />

        <TrainerCard />
      </section>
    </TrainerContext.Provider>
  );
};

export const useTrainerContext = () => useContext(TrainerContext)!;

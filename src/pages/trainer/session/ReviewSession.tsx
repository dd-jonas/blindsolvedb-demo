import { useParams } from 'react-router-dom';

import { Alert, Spinner } from '#components';
import { useSettings } from '#providers';
import { useReviewSession } from '#services/trainer';

import { TrainerProvider } from './TrainerProvider';

export const ReviewSession = () => {
  const { ls } = useSettings();
  const { setSlug } = useParams();
  const query = useReviewSession(setSlug!);

  if (query.isLoading || query.isIdle) return <Spinner />;
  if (query.isError) return <Alert danger>{query.error.message}</Alert>;

  const session = query.data;

  const pool = session.pool.map((card) => ({
    ...card,
    prompt: ls(card.prompt, session.buffers),
  }));

  return <TrainerProvider title={`Review – ${session.name}`} pool={pool} />;
};

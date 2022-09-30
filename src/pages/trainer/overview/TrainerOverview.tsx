import { Alert, Message, Spinner } from '#components';
import { useTrainerOverview } from '#services/trainer';

import { TrainerOverviewCard } from './TrainerOverviewCard';

export const TrainerOverview = () => {
  const query = useTrainerOverview();

  if (query.isLoading || query.isIdle) return <Spinner />;
  if (query.isError) return <Alert danger>{query.error.message}</Alert>;

  const sets = query.data;

  if (sets.length === 0) {
    return <Message>Get started by selecting algorithms from a set.</Message>;
  }

  return (
    <section className="trainer-overview">
      {sets.map((set) => (
        <TrainerOverviewCard key={set.slug} set={set} />
      ))}
    </section>
  );
};

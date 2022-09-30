import { useParams } from 'react-router-dom';

import { Alert, SetHeader, Spinner } from '#components';
import { useTrainerDetail } from '#services/trainer';

import { SetProgress } from '../shared/SetProgress';
import { TrainerDetailActions } from './TrainerDetailActions';
import { TrainerDetailTable } from './TrainerDetailTable';

export const TrainerDetail = () => {
  const { setSlug } = useParams();
  const query = useTrainerDetail(setSlug!);

  if (query.isLoading || query.isIdle) return <Spinner />;
  if (query.isError) return <Alert danger>{query.error.message}</Alert>;

  const set = query.data;

  return (
    <section className="trainer-detail">
      <SetHeader title={set.name} returnTo="/trainer" />

      <div className="trainer-detail__bar">
        <SetProgress set={set} />

        <TrainerDetailActions set={set} />
      </div>

      <TrainerDetailTable set={set} />
    </section>
  );
};

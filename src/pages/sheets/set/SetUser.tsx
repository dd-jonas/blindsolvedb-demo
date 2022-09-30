import { useParams } from 'react-router-dom';

import { Alert, Spinner } from '#components';
import { useUserAlgorithms } from '#services/sheets';
import { Set } from '#types/api';

import { SetActions } from './SetActions';
import { SetTable } from './SetTable';

type SetUserProps = { set: Set };

export const SetUser = ({ set }: SetUserProps) => {
  const { setSlug } = useParams();
  const query = useUserAlgorithms(setSlug!);

  if (query.isLoading || query.isIdle) return <Spinner />;
  if (query.isError) return <Alert danger>{query.error.message}</Alert>;

  const algorithms = query.data;

  return (
    <>
      <SetActions
        set={set}
        showFill={algorithms.length < set.size}
        showClear={algorithms.length > 0}
      />

      <SetTable set={set} algorithms={algorithms} />
    </>
  );
};

import { useParams } from 'react-router-dom';

import { Alert, Spinner } from '#components';
import { usePopularAlgorithms } from '#services/sheets';
import { Set } from '#types/api';

import { SetTable } from './SetTable';

type SetPopularProps = { set: Set };

export const SetPopular = ({ set }: SetPopularProps) => {
  const { setSlug } = useParams();
  const query = usePopularAlgorithms(setSlug!);

  if (query.isLoading || query.isIdle) return <Spinner />;
  if (query.isError) return <Alert danger>{query.error.message}</Alert>;

  const algorithms = query.data;

  return <SetTable set={set} algorithms={algorithms} />;
};

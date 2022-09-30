import { Outlet, useOutletContext, useParams } from 'react-router-dom';

import { Alert, Spinner } from '#components';
import { useSet } from '#services/sheets';
import { Set } from '#types/api';

export const SetContext = () => {
  const { setSlug } = useParams();
  const query = useSet(setSlug!);

  if (query.isLoading || query.isIdle) return <Spinner />;
  if (query.isError) return <Alert danger>{query.error.message}</Alert>;

  const set = query.data;

  return <Outlet context={set} />;
};

export const useSetContext = () => useOutletContext<Set>();

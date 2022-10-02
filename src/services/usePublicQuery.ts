import { QueryKey, useQuery, UseQueryOptions } from 'react-query';

import { fetchFn as fetch } from './fetch';

export const usePublicQuery = <Result>(
  key: QueryKey,
  path: string,
  options?: UseQueryOptions<Result, Error, Result, QueryKey>
) => {
  path = path.replace(/(?<!^)\//g, '.');

  const url = `${import.meta.env.VITE_API_URL}${path}.json`;
  return useQuery(key, () => fetch(url), options);
};

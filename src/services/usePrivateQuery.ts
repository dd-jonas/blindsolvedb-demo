import { QueryKey, useQuery, UseQueryOptions } from 'react-query';

import { fetchFn as fetch } from './fetch';

export const usePrivateQuery = <Result>(
  key: QueryKey,
  path: string,
  options?: UseQueryOptions<Result, Error, Result, QueryKey>
) => {
  // -- Demo code
  path = path.replace(/(?<!^)\//g, '.');
  // -- End demo code

  const url = `${import.meta.env.VITE_API_URL}${path}.json`;

  return useQuery(key, () => fetch(url), options);
};

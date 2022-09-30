import { useAuth0 } from '@auth0/auth0-react';
import { useMutation, UseMutationOptions } from 'react-query';

import { fetchFn as fetch } from './fetch';

export const usePrivateMutation = <TData, TVariables>(
  method: 'post' | 'put' | 'delete',
  path: string,
  options?: UseMutationOptions<TData, Error, TVariables, unknown>
) => {
  const { getAccessTokenSilently } = useAuth0();
  const url = `${import.meta.env.VITE_API_URL}${path}`;

  return useMutation(async (data) => {
    const token = await getAccessTokenSilently();

    return fetch(url, {
      method,
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(data ?? {}),
    });
  }, options);
};

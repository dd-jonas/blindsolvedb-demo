import { useMutation, UseMutationOptions } from 'react-query';
import { toast } from 'react-toastify';

export const usePrivateMutation = <TData, TVariables>(
  method: 'post' | 'put' | 'delete',
  path: string,
  options?: UseMutationOptions<TData, Error, TVariables, unknown>
) => {
  return useMutation(async () => {
    if (method === 'put' && /^\/trainer\/[^/]+$/.test(path)) {
      // Don't show toasts for clicking trainer results
      return null as TData;
    }

    toast.warn('Mutations not supported in this demo.', {
      toastId: 'demo-mutation',
    });

    return null as TData;
  }, options);
};

import { useMutation, UseMutationOptions } from 'react-query';
import { toast } from 'react-toastify';

export const usePrivateMutation = <TData, TVariables>(
  method: 'post' | 'put' | 'delete',
  path: string,
  options?: UseMutationOptions<TData, Error, TVariables, unknown>
) => {
  return useMutation(async () => {
    const isTrainerResultMutation =
      method === 'put' && /^\/trainer\/[^/]+$/.test(path);

    // Don't show toasts for clicking trainer results
    if (!isTrainerResultMutation) {
      toast.warn('Mutations not supported in this demo.', {
        toastId: 'demo-mutation',
      });
    }

    return null as unknown as TData;
  }, options);
};

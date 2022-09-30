import { useQueryClient } from 'react-query';

import { SheetsKeys, TrainerKeys } from '#services/keys';
import { usePrivateMutation } from '#services/usePrivateMutation';
import { UserAlgorithm } from '#types/api';

type Result = { shape_id: number; user_id: string } | null;
type Body = { shapeId: number };

export const useSwitchAlgorithm = (slug: string) => {
  const queryClient = useQueryClient();
  const key = SheetsKeys.user.caseAlgorithm(slug);

  return usePrivateMutation<Result, Body>(
    'put',
    `/sheets/user/cases/${slug}/algorithm`,
    {
      onMutate: async (variables) => {
        // Cancel any outgoing refetches (so they don't overwrite the optimistic update)
        await queryClient.cancelQueries(key);

        // Snapshot the previous value
        const previousUserAlgorithm =
          queryClient.getQueryData<UserAlgorithm>(key);

        // Optimistically update to the new value
        const newAlgorithm =
          variables.shapeId === previousUserAlgorithm?.shape_id
            ? { shape_id: null }
            : { shape_id: variables.shapeId };

        queryClient.setQueryData(key, newAlgorithm);

        // Return a context object with the snapshotted value
        return { previousUserAlgorithm };
      },
      // If the mutation fails, use the context returned from onMutate to roll back
      onError: (error, newAlgorithm, context) => {
        const { previousUserAlgorithm } = context as {
          previousUserAlgorithm: UserAlgorithm;
        };
        queryClient.setQueryData(key, previousUserAlgorithm);
      },
      // Always refetch after error or success
      onSettled: () => {
        queryClient.invalidateQueries(SheetsKeys.all);
        queryClient.invalidateQueries(TrainerKeys.all);
      },
    }
  );
};

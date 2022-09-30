import { useQueryClient } from 'react-query';

import { SheetsKeys } from '#services/keys';
import { usePrivateMutation } from '#services/usePrivateMutation';

type Result = { id: number; algorithm_id: number; text: string };
type Body = { algorithm: string };

export const useAddAlgorithm = (slug: string) => {
  const queryClient = useQueryClient();

  return usePrivateMutation<Result, Body>(
    'post',
    `/sheets/user/cases/${slug}/algorithm`,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(SheetsKeys.all);
      },
    }
  );
};

import { useQueryClient } from 'react-query';

import { SheetsKeys, TrainerKeys } from '#services/keys';
import { usePrivateMutation } from '#services/usePrivateMutation';

export const useFillSet = (slug: string) => {
  const queryClient = useQueryClient();

  return usePrivateMutation<null, null>(
    'post',
    `/sheets/user/sets/${slug}/algorithms`,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(SheetsKeys.all);
        queryClient.invalidateQueries(TrainerKeys.all);
      },
    }
  );
};

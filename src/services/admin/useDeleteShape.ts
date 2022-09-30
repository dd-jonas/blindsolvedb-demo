import { useQueryClient } from 'react-query';

import { SheetsKeys, TrainerKeys } from '#services/keys';
import { usePrivateMutation } from '#services/usePrivateMutation';

export const useDeleteShape = (id: number) => {
  const queryClient = useQueryClient();

  return usePrivateMutation<null, null>('delete', `/admin/shape/${id}`, {
    onSuccess: () => {
      queryClient.invalidateQueries(SheetsKeys.all);
      queryClient.invalidateQueries(TrainerKeys.all);
    },
  });
};

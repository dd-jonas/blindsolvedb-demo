import { useQueryClient } from 'react-query';

import { AdminKeys } from '#services/keys';
import { usePrivateMutation } from '#services/usePrivateMutation';

export const useDeleteReport = (id: number) => {
  const queryClient = useQueryClient();

  return usePrivateMutation<null, null>('delete', `/admin/reports/${id}`, {
    onSuccess: () => {
      queryClient.invalidateQueries(AdminKeys.reports);
    },
  });
};

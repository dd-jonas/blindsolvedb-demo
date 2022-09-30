import { useQueryClient } from 'react-query';

import { AdminKeys } from '#services/keys';
import { usePrivateMutation } from '#services/usePrivateMutation';

type Body = { shapeId: string; message: string };

export const useReportShape = () => {
  const queryClient = useQueryClient();

  return usePrivateMutation<null, Body>('post', '/admin/reports', {
    onSuccess: () => {
      queryClient.invalidateQueries(AdminKeys.reports);
    },
  });
};

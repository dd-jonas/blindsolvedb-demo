import { useQueryClient } from 'react-query';

import { TrainerKeys } from '#services/keys';
import { usePrivateMutation } from '#services/usePrivateMutation';
import { ResultStatus } from '#types/trainer';

type Body = {
  algorithm_id: number;
  time: number;
  status: ResultStatus;
};

export const useSubmitResult = (slug: string) => {
  const queryClient = useQueryClient();

  return usePrivateMutation<null, Body>('put', `/trainer/${slug}`, {
    onSuccess: () => {
      queryClient.invalidateQueries(TrainerKeys.overview, { exact: true });
      queryClient.invalidateQueries(TrainerKeys.detail(slug), { exact: true });
    },
  });
};

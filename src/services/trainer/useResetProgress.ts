import { useQueryClient } from 'react-query';

import { TrainerKeys } from '#services/keys';
import { usePrivateMutation } from '#services/usePrivateMutation';
import { TrainerDetail } from '#types/api';

export const useResetProgress = (slug: string) => {
  const queryClient = useQueryClient();
  const key = TrainerKeys.detail(slug);

  return usePrivateMutation<null, null>('delete', `/trainer/${slug}/reset`, {
    onMutate: async () => {
      await queryClient.cancelQueries(key);

      const previousTrainerDetail =
        queryClient.getQueryData<TrainerDetail>(key);

      const newTrainerDetail = {
        ...previousTrainerDetail,
        learned: 0,
        results: 0,
        review: 0,
        cases: previousTrainerDetail?.cases.map((c) => ({
          ...c,
          average: null, // Update average to null
        })),
      };

      queryClient.setQueryData(key, newTrainerDetail);

      return { previousTrainerDetail };
    },
    onError: (error, newTrainerDetail, context) => {
      const { previousTrainerDetail } = context as {
        previousTrainerDetail: TrainerDetail;
      };
      queryClient.setQueryData(key, previousTrainerDetail);
    },
    onSettled: () => {
      queryClient.invalidateQueries(TrainerKeys.all);
    },
  });
};

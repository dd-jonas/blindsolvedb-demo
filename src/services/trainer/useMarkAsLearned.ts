import { useQueryClient } from 'react-query';

import { TrainerKeys } from '#services/keys';
import { usePrivateMutation } from '#services/usePrivateMutation';
import { TrainerDetail } from '#types/api';

export const useMarkAsLearned = (slug: string) => {
  const queryClient = useQueryClient();
  const key = TrainerKeys.detail(slug);

  return usePrivateMutation<null, null>(
    'put',
    `/trainer/${slug}/mark-as-learned`,
    {
      onMutate: async () => {
        await queryClient.cancelQueries(key);

        const previousTrainerDetail =
          queryClient.getQueryData<TrainerDetail>(key);

        const notLearned = previousTrainerDetail?.cases.filter(
          (c) => c.algorithm && c.average === null
        ).length;

        const newTrainerDetail = {
          ...previousTrainerDetail,
          learned: previousTrainerDetail?.used,
          results: previousTrainerDetail?.used,
          review: previousTrainerDetail?.review! + notLearned!,
          cases: previousTrainerDetail?.cases.map((c) => ({
            ...c,
            average: c.average === null ? 0 : c.average, // Update null values to 0
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
    }
  );
};

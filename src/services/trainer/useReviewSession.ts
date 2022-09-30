import { TrainerKeys } from '#services/keys';
import { usePrivateQuery } from '#services/usePrivateQuery';
import { TrainerSession } from '#types/api';

export const useReviewSession = (slug: string) => {
  return usePrivateQuery<TrainerSession>(
    TrainerKeys.review(slug),
    `/trainer/${slug}/review`,
    {
      cacheTime: 0,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );
};

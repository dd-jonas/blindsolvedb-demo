import { TrainerKeys } from '#services/keys';
import { usePrivateQuery } from '#services/usePrivateQuery';
import { TrainerSession } from '#types/api';

export const useLearnSession = (slug: string) => {
  return usePrivateQuery<TrainerSession>(
    TrainerKeys.learn(slug),
    `/trainer/${slug}/learn`,
    {
      cacheTime: 0,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );
};

import { TrainerKeys } from '#services/keys';
import { usePrivateQuery } from '#services/usePrivateQuery';
import { TrainerOverview } from '#types/api';

export const useTrainerOverview = () => {
  return usePrivateQuery<TrainerOverview[]>(TrainerKeys.overview, '/trainer', {
    staleTime: 1000 * 60,
  });
};

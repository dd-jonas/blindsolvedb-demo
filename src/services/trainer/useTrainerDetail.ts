import { useQueryClient } from 'react-query';

import { TrainerKeys } from '#services/keys';
import { usePrivateQuery } from '#services/usePrivateQuery';
import { TrainerDetail, TrainerOverview } from '#types/api';

export const useTrainerDetail = (slug: string) => {
  const queryClient = useQueryClient();

  return usePrivateQuery<TrainerDetail>(
    TrainerKeys.detail(slug),
    `/trainer/${slug}`,
    {
      staleTime: 1000 * 60,
      placeholderData: () => {
        const set = queryClient
          .getQueryData<TrainerOverview[]>(TrainerKeys.overview)
          ?.find((s) => s.slug === slug);

        return set ? { ...set, subsets: null, cases: [] } : undefined;
      },
    }
  );
};

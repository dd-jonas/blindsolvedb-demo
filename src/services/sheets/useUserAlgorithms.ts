import { SheetsKeys } from '#services/keys';
import { usePrivateQuery } from '#services/usePrivateQuery';
import { SetAlgorithm } from '#types/api';

export const useUserAlgorithms = (slug: string) => {
  return usePrivateQuery<SetAlgorithm[]>(
    SheetsKeys.user.setAlgorithms(slug),
    `/sheets/user/sets/${slug}/algorithms`,
    {
      staleTime: 1000 * 60,
      placeholderData: [],
    }
  );
};

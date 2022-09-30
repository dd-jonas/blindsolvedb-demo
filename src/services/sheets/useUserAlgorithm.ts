import { SheetsKeys } from '#services/keys';
import { usePrivateQuery } from '#services/usePrivateQuery';
import { UserAlgorithm } from '#types/api';

export const useUserAlgorithm = (slug: string) => {
  return usePrivateQuery<UserAlgorithm>(
    SheetsKeys.user.caseAlgorithm(slug),
    `/sheets/user/cases/${slug}/algorithm`,
    {
      staleTime: 1000 * 60,
      placeholderData: { shape_id: null },
    }
  );
};

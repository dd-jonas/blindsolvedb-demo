import { SheetsKeys } from '#services/keys';
import { usePrivateQuery } from '#services/usePrivateQuery';
import { Category } from '#types/api';

export const useUserCategories = () => {
  return usePrivateQuery<Category[]>(
    SheetsKeys.user.categories,
    '/sheets/user',
    { staleTime: 1000 * 60 }
  );
};

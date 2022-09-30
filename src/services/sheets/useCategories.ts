import { SheetsKeys } from '#services/keys';
import { usePublicQuery } from '#services/usePublicQuery';
import { Category } from '#types/api';

export const useCategories = () => {
  return usePublicQuery<Category[]>(
    SheetsKeys.public.categories,
    '/sheets/public',
    { staleTime: Infinity }
  );
};

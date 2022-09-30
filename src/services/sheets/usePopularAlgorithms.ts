import { SheetsKeys } from '#services/keys';
import { usePublicQuery } from '#services/usePublicQuery';
import { SetAlgorithm } from '#types/api';

export const usePopularAlgorithms = (slug: string) => {
  return usePublicQuery<SetAlgorithm[]>(
    SheetsKeys.public.setAlgorithms(slug),
    `/sheets/public/sets/${slug}/algorithms`,
    { staleTime: 1000 * 60 }
  );
};

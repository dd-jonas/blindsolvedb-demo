import { useQueryClient } from 'react-query';

import { SheetsKeys } from '#services/keys';
import { usePublicQuery } from '#services/usePublicQuery';
import { Category, Set } from '#types/api';

export const useSet = (slug: string) => {
  const queryClient = useQueryClient();

  return usePublicQuery<Set>(
    SheetsKeys.public.set(slug),
    `/sheets/public/sets/${slug}`,
    {
      staleTime: Infinity,
      placeholderData: () => {
        const set = queryClient
          .getQueryData<Category[]>(SheetsKeys.public.categories)
          ?.flatMap((c) => c.sets)
          .find((s) => s.slug === slug);

        return set ? { ...set, headers: '', size: 0, cases: [] } : undefined;
      },
    }
  );
};

import { SheetsKeys } from '#services/keys';
import { usePublicQuery } from '#services/usePublicQuery';
import { Case } from '#types/api';

export const useCase = (setSlug: string, caseSlug: string) => {
  setSlug = 'corners-ufr';
  caseSlug = caseSlug === 'UFR-UBR-UBL' ? caseSlug : 'UFR-UBL-UBR';

  return usePublicQuery<Case>(
    SheetsKeys.public.case(setSlug, caseSlug),
    `/sheets/public/sets/${setSlug}/${caseSlug}`,
    { staleTime: 1000 * 60 }
  );
};

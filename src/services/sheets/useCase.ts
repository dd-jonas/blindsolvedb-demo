import { SheetsKeys } from '#services/keys';
import { usePublicQuery } from '#services/usePublicQuery';
import { Case } from '#types/api';

export const useCase = (setSlug: string, caseSlug: string) => {
  // -- Demo code
  setSlug = 'corners-ufr';
  caseSlug = caseSlug === 'UFR-UBR-UBL' ? caseSlug : 'UFR-UBL-UBR';
  // -- End demo code

  return usePublicQuery<Case>(
    SheetsKeys.public.case(setSlug, caseSlug),
    `/sheets/public/sets/${setSlug}/${caseSlug}`,
    { staleTime: 1000 * 60 }
  );
};

import { AdminKeys } from '#services/keys';
import { usePrivateQuery } from '#services/usePrivateQuery';
import { Report } from '#types/api';

export const useReports = () => {
  return usePrivateQuery<Report[]>(AdminKeys.reports, `/admin/reports`);
};

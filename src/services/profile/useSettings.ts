import { defaultSettings } from '#config/settings';
import { ProfileKeys } from '#services/keys';
import { usePrivateQuery } from '#services/usePrivateQuery';
import { Settings } from '#types/api';

export const useSettings = ({ enabled }: { enabled: boolean }) => {
  return usePrivateQuery<Settings>(ProfileKeys.settings, `/profile/settings`, {
    placeholderData: defaultSettings,
    staleTime: Infinity, // Only changes on client, use invalidateQueries to update
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    enabled,
  });
};

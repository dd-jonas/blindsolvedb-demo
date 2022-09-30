import { useAuth0 } from '@auth0/auth0-react';
import { createContext, ReactNode, useContext } from 'react';

import { Alert, Spinner } from '#components';
import { useSettings as useSettingsQuery } from '#services/profile';
import { Settings } from '#types/api';
import { CubeLocation } from '#types/cube';

const SettingsContext = createContext<
  (Settings & { ls: (target: string, buffers?: string) => string }) | null
>(null);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth0();
  const query = useSettingsQuery({ enabled: isAuthenticated });

  if (query.isLoading || query.isIdle) return <Spinner />;
  if (query.isError) return <Alert danger>{query.error.message}</Alert>;

  // If user is not authenticated, useSettings will use the placeholder data,
  // which means it is not necessary to check if the query is enabled.
  const settings = query.data;

  /** Convert a target based on the lettering scheme */
  const ls = (target: string, buffers?: string) => {
    if (!settings.preferences.useLetteringScheme) return target;

    const bufferRE = new RegExp(
      (buffers ?? '').replaceAll(/[^|]+/g, (b) => String.raw`\b${b}\b`),
      'g'
    );

    const pureTarget = target.replaceAll(bufferRE, '');

    const converted = pureTarget.replaceAll(/\b\w+\b/g, (match) => {
      if (!settings.preferences.useLetteringScheme) return match;
      return settings.lettering_scheme[match as CubeLocation] ?? match;
    });

    return converted.replaceAll(/-|\[]/g, '').trim();
  };

  return (
    <SettingsContext.Provider value={{ ...settings, ls }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext)!;

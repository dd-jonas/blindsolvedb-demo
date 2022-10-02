import { createContext, ReactNode, useContext, useState } from 'react';

import { defaultSettings } from '#config/settings';
import { Settings } from '#types/api';
import { CubeLocation } from '#types/cube';

type DeepPartial<T> = { [K in keyof T]?: DeepPartial<T[K]> };
type LS = (target: string, buffers?: string) => string;

const SettingsContext = createContext<
  | (Settings & {
      ls: LS;
      updateSettings: (data: DeepPartial<Settings>) => void;
    })
  | null
>(null);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState(defaultSettings);

  const updateSettings = (data: DeepPartial<Settings>) => {
    setSettings((prev) => ({
      color_scheme: { ...prev.color_scheme, ...data.color_scheme },
      lettering_scheme: {
        ...prev.lettering_scheme,
        ...data.lettering_scheme,
      },
      preferences: { ...prev.preferences, ...data.preferences },
    }));
  };

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
    <SettingsContext.Provider value={{ ...settings, updateSettings, ls }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext)!;

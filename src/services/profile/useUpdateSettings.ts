import { useQueryClient } from 'react-query';

import { ProfileKeys } from '#services/keys';
import { usePrivateMutation } from '#services/usePrivateMutation';
import { Settings } from '#types/api';

export type Body = {
  letteringScheme?: Partial<Settings['lettering_scheme']>;
  colorScheme?: Partial<Settings['color_scheme']>;
  preferences?: Partial<Settings['preferences']>;
};

export const useUpdateSettings = () => {
  const queryClient = useQueryClient();
  const key = ProfileKeys.settings;

  return usePrivateMutation<null, Body>('put', '/profile/settings', {
    onMutate: async (variables) => {
      await queryClient.cancelQueries(key);

      const previousSettings = queryClient.getQueryData<Settings>(key);

      const newSettings: Settings = {
        lettering_scheme: {
          ...previousSettings?.lettering_scheme,
          ...(variables.letteringScheme as Settings['lettering_scheme']),
        },
        color_scheme: {
          ...previousSettings?.color_scheme,
          ...(variables.colorScheme as Settings['color_scheme']),
        },
        preferences: {
          ...previousSettings?.preferences,
          ...(variables.preferences as Settings['preferences']),
        },
      };

      queryClient.setQueryData(key, newSettings);

      return { previousSettings };
    },
    onError: (error, newAlgorithm, context) => {
      const { previousSettings } = context as { previousSettings: Settings };
      queryClient.setQueryData(key, previousSettings);
    },
    onSettled: () => {
      queryClient.invalidateQueries(ProfileKeys.all);
    },
  });
};

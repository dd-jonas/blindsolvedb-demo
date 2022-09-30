import { AdminKeys } from '#services/keys';
import { usePrivateQuery } from '#services/usePrivateQuery';
import { Shape } from '#types/api';

export const useShape = (id: number) => {
  return usePrivateQuery<Shape>(AdminKeys.shape(id), `/admin/shape/${id}`, {
    placeholderData: () => ({
      id,
      algorithm_id: 0,
      text: 'Loading...',
      base: 'Loading...',
      users: 0,
      created_by: 'Loading...',
      created_at: '',
    }),
  });
};

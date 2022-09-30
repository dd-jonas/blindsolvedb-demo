import { toast } from 'react-toastify';

import { Alert, Spinner } from '#components';
import { useSwitchAlgorithm, useUserAlgorithm } from '#services/sheets';

import { SwitchButton } from './SwitchButton';

type CaseTableColumnUserProps = {
  slug: string;
  shapeId: number;
};

export const CaseTableColumnUser = ({
  slug,
  shapeId,
}: CaseTableColumnUserProps) => {
  const query = useUserAlgorithm(slug);
  const mutation = useSwitchAlgorithm(slug);

  if (query.isLoading || query.isIdle) return <Spinner />;
  if (query.isError) return <Alert danger>{query.error.message}</Alert>;

  const userAlgorithm = query.data;

  const switchAlgorithm = (shapeId: number) => {
    if (mutation.isLoading) return;
    mutation.mutate(
      { shapeId },
      {
        onError: () => {
          toast.error('Failed to select algorithm');
        },
      }
    );
  };

  return (
    <td>
      <SwitchButton
        isSelected={userAlgorithm.shape_id === shapeId}
        onClick={() => switchAlgorithm(shapeId)}
      />
    </td>
  );
};

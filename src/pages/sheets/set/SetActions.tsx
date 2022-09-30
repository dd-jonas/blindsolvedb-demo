import { DocumentAddIcon, DocumentRemoveIcon } from '@heroicons/react/outline';
import { OverlayContainer } from '@react-aria/overlays';
import { toast } from 'react-toastify';

import { Button, ModalDialog } from '#components';
import { useOverlayState } from '#hooks';
import { useClearSet, useFillSet } from '#services/sheets';
import { Set } from '#types/api';

type SetActionsProps = {
  set: Set;
  showFill: boolean;
  showClear: boolean;
};

export const SetActions = ({ set, showFill, showClear }: SetActionsProps) => {
  const fillModal = useOverlayState();
  const clearModal = useOverlayState();

  const fillMutation = useFillSet(set.slug);
  const clearMutation = useClearSet(set.slug);

  const isLoading = fillMutation.isLoading || clearMutation.isLoading;

  const fill = () => {
    if (isLoading) return;
    fillMutation.mutate(null, {
      onError: () => {
        toast.error('Failed to fill set');
      },
    });
  };

  const clear = () => {
    if (isLoading) return;
    clearMutation.mutate(null, {
      onError: () => {
        toast.error('Failed to clear set');
      },
    });
  };

  return (
    <div className="set__actions">
      {showClear && (
        <Button
          onClick={clearModal.open}
          variant="ghost"
          icon={<DocumentRemoveIcon />}
          loading={clearMutation.isLoading}
          disabled={isLoading}
          small
          danger
        >
          Clear
        </Button>
      )}

      {showFill && (
        <Button
          onClick={fillModal.open}
          variant="ghost"
          icon={<DocumentAddIcon />}
          loading={fillMutation.isLoading}
          disabled={isLoading}
          small
        >
          Fill
        </Button>
      )}

      {clearModal.isOpen && (
        <OverlayContainer>
          <ModalDialog
            title="Clear set"
            actionLabel="Yes, clear set"
            isOpen={clearModal.isOpen}
            onAction={clear}
            onClose={clearModal.close}
            danger
          >
            This action cannot be undone. This will unselect all your algorithms
            from this set.
            <br />
            Are you sure you want to proceed?
          </ModalDialog>
        </OverlayContainer>
      )}

      {fillModal.isOpen && (
        <OverlayContainer>
          <ModalDialog
            title="Fill set"
            actionLabel="Yes, fill set"
            isOpen={fillModal.isOpen}
            onAction={fill}
            onClose={fillModal.close}
          >
            This action will select the most popular algorithm for each empty
            case in this set.
            <br />
            Are you sure you want to proceed?
          </ModalDialog>
        </OverlayContainer>
      )}
    </div>
  );
};

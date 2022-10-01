import { BookOpenIcon, TrashIcon } from '@heroicons/react/outline';
import { OverlayContainer } from '@react-aria/overlays';
import { toast } from 'react-toastify';

import { Button, Dialog, ModalDialog } from '#components';
import { useOverlayState } from '#hooks';
import { useDeleteShape } from '#services/admin';

import { ShapeDetail } from './ShapeDetail';

type CaseTableColumnAdminProps = { shapeId: number };

export const CaseTableColumnAdmin = ({
  shapeId,
}: CaseTableColumnAdminProps) => {
  const infoModal = useOverlayState();
  const deleteModal = useOverlayState();
  const mutation = useDeleteShape(shapeId);

  const deleteShape = () => {
    if (mutation.isLoading) return;

    mutation.mutate(null, {
      onError: () => {
        toast.error('Failed to delete shape');
      },
    });
  };

  return (
    <td className="case-table__action">
      <Button
        variant="ghost"
        icon={<BookOpenIcon />}
        onClick={infoModal.open}
        small
      />

      <Button
        variant="ghost"
        icon={<TrashIcon />}
        onClick={deleteModal.open}
        small
        danger
      />

      {infoModal.isOpen && (
        <OverlayContainer>
          <Dialog
            title="Shape Info"
            isOpen={infoModal.isOpen}
            onClose={infoModal.close}
          >
            <ShapeDetail shapeId={shapeId} />
          </Dialog>
        </OverlayContainer>
      )}

      {deleteModal.isOpen && (
        <OverlayContainer>
          <ModalDialog
            title="Delete shape"
            isOpen={deleteModal.isOpen}
            actionLabel="Yes, delete shape"
            onAction={deleteShape}
            onClose={deleteModal.close}
            danger
          >
            This action cannot be undone. It will delete this shape, and all
            users of this shape will switch to the most popular alternative, if
            one exists.
            <br />
            Are you sure you want to proceed?
          </ModalDialog>
        </OverlayContainer>
      )}
    </td>
  );
};

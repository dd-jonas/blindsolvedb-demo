import { XIcon } from '@heroicons/react/outline';
import { OverlayContainer } from '@react-aria/overlays';
import clsx from 'clsx';
import { useNavigate, useParams } from 'react-router-dom';

import { Button, ModalDialog } from '#components';
import { useOverlayState } from '#hooks';

import { useTrainerContext } from './TrainerProvider';

export const TrainerEndButton = () => {
  const { setSlug } = useParams();
  const navigate = useNavigate();
  const { currentCard, endSession } = useTrainerContext();
  const modal = useOverlayState();

  const disabled = currentCard.type === 'end';

  return (
    <>
      <Button
        className={clsx('trainer__end', disabled && 'trainer__end--disabled')}
        icon={<XIcon />}
        variant="ghost"
        onClick={() => {
          currentCard.type === 'start'
            ? navigate(`/trainer/${setSlug}`)
            : modal.open();
        }}
        disabled={disabled}
      />

      {modal.isOpen && (
        <OverlayContainer>
          <ModalDialog
            title="End session"
            actionLabel="Yes"
            cancelLabel="No"
            isOpen={modal.isOpen}
            onAction={endSession}
            onClose={modal.close}
            danger
          >
            Do you want to end the current training session?
          </ModalDialog>
        </OverlayContainer>
      )}
    </>
  );
};

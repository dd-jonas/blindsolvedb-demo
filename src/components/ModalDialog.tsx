/* https://react-spectrum.adobe.com/react-aria/useDialog.html */

import { useDialog } from '@react-aria/dialog';
import { FocusScope } from '@react-aria/focus';
import {
  OverlayProps,
  useModal,
  useOverlay,
  usePreventScroll,
} from '@react-aria/overlays';
import { MouseEventHandler, ReactNode, useRef } from 'react';

import { Button } from '#components';

type ModalDialogProps = OverlayProps & {
  title: string;
  children: ReactNode;
  actionLabel: string;
  cancelLabel?: string;
  onAction: MouseEventHandler<HTMLButtonElement>;
  danger?: boolean;
};

export const ModalDialog = (props: ModalDialogProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { overlayProps, underlayProps } = useOverlay(
    { ...props, isDismissable: true },
    ref
  );
  const { dialogProps, titleProps } = useDialog({ role: 'alertdialog' }, ref);
  const { modalProps } = useModal();

  usePreventScroll();

  const {
    title,
    children,
    actionLabel,
    onAction,
    cancelLabel = 'Cancel',
    onClose,
    danger = false,
  } = props;

  return (
    <div className="dialog__overlay" {...underlayProps}>
      <FocusScope contain restoreFocus autoFocus>
        <div
          {...overlayProps}
          {...dialogProps}
          {...modalProps}
          ref={ref}
          className="dialog__content"
        >
          <h3 {...titleProps} className="dialog__title">
            {title}
          </h3>

          <div className="dialog__message">{children}</div>

          <div className="dialog__actions">
            <Button variant="secondary" onClick={onClose}>
              {cancelLabel}
            </Button>

            <Button
              variant="primary"
              onClick={(e) => {
                onClose?.();
                onAction(e);
              }}
              danger={danger}
            >
              {actionLabel}
            </Button>
          </div>
        </div>
      </FocusScope>
    </div>
  );
};

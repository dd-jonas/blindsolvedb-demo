/* https://react-spectrum.adobe.com/react-aria/useDialog.html */

import { useDialog } from '@react-aria/dialog';
import { FocusScope } from '@react-aria/focus';
import {
  OverlayProps,
  useOverlay,
  usePreventScroll,
} from '@react-aria/overlays';
import { ReactNode, useRef } from 'react';

type DialogProps = OverlayProps & {
  title: string;
  children: ReactNode;
};

export const Dialog = (props: DialogProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { overlayProps, underlayProps } = useOverlay(
    {
      isDismissable: true,
      onClose: props.onClose,
      isOpen: props.isOpen,
    },
    ref
  );
  const { dialogProps, titleProps } = useDialog({}, ref);

  usePreventScroll();

  const { title, children } = props;

  return (
    <div className="dialog__overlay" {...underlayProps}>
      <FocusScope contain restoreFocus autoFocus>
        <div
          {...overlayProps}
          {...dialogProps}
          ref={ref}
          className="dialog__content"
        >
          <h3 {...titleProps} className="dialog__title">
            {title}
          </h3>

          <div className="dialog__message">{children}</div>
        </div>
      </FocusScope>
    </div>
  );
};

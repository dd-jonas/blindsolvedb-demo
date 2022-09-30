import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationIcon,
  InformationCircleIcon,
} from '@heroicons/react/outline';
import clsx from 'clsx';
import { HTMLAttributes, ReactNode } from 'react';

type AlertProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  success?: boolean;
  info?: boolean;
  warning?: boolean;
  danger?: boolean;
};

export const Alert = ({
  children,
  success,
  info,
  warning,
  danger,
  ...props
}: AlertProps) => {
  const classes = clsx(
    'alert',
    success && 'alert--success',
    info && 'alert--info',
    warning && 'alert--warning',
    danger && 'alert--danger'
  );

  return (
    <div {...props} className={classes} role="alert">
      {success && <CheckCircleIcon />}
      {info && <InformationCircleIcon />}
      {warning && <ExclamationIcon />}
      {danger && <ExclamationCircleIcon />}

      {children}
    </div>
  );
};

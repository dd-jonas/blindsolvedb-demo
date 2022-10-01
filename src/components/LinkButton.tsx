import clsx from 'clsx';
import { MouseEvent, ReactNode } from 'react';
import { Link, To } from 'react-router-dom';
import { toast } from 'react-toastify';

type LinkButtonProps = {
  to: To;
  replace?: boolean;
  children?: ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost';
  danger?: boolean;
  disabled?: boolean;
  small?: boolean;
  icon?: ReactNode;
  className?: string;
};

export const LinkButton = ({
  to,
  replace = false,
  children,
  variant = 'primary',
  danger = false,
  disabled = false,
  small = false,
  icon = null,
  className = '',
}: LinkButtonProps) => {
  const classes = clsx(
    'button',
    `button--${variant}`,
    danger && 'button--danger',
    small && 'button--small',
    icon && 'button--icon',
    icon && !children && 'button--icon--only',
    className
  );

  // -- Demo code
  const preventNavigation = (e: MouseEvent<HTMLAnchorElement>) => {
    toast.dismiss();

    if (disabled) {
      e.preventDefault();
      toast.warn(`The set "${children}" is not available in the demo version.`);
    }
  };
  // -- End demo code

  return (
    <Link
      to={to}
      replace={replace}
      className={classes}
      onClick={preventNavigation}
    >
      {icon}
      {icon && children ? <span>{children}</span> : children}
    </Link>
  );
};

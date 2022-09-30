import clsx from 'clsx';
import { ReactNode } from 'react';
import { Link, To } from 'react-router-dom';

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

  return (
    <Link to={to} replace={replace} className={classes}>
      {icon}
      {icon && children ? <span>{children}</span> : children}
    </Link>
  );
};

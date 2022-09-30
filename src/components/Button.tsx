import clsx from 'clsx';
import {
  ComponentPropsWithoutRef,
  forwardRef,
  MouseEventHandler,
  ReactNode,
} from 'react';

type ButtonProps = ComponentPropsWithoutRef<'button'> & {
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost';
  danger?: boolean;
  loading?: boolean;
  disabled?: boolean;
  small?: boolean;
  icon?: ReactNode;
  className?: string;
  type?: 'button' | 'submit';
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      onClick,
      variant = 'primary',
      danger = false,
      loading = false,
      disabled = false,
      small = false,
      icon = null,
      className = '',
      type = 'button',
    },
    ref
  ) => {
    const classes = clsx(
      'button',
      `button--${variant}`,
      danger && 'button--danger',
      loading && 'button--loading',
      small && 'button--small',
      icon && 'button--icon',
      icon && !children && 'button--icon--only',
      className
    );

    return (
      <button
        ref={ref}
        onClick={onClick}
        className={classes}
        disabled={disabled || loading}
        type={type}
      >
        {icon}
        {icon && children ? <span>{children}</span> : children}
      </button>
    );
  }
);

Button.displayName = 'Button';

import clsx from 'clsx';
import { forwardRef, HTMLAttributes, ReactNode } from 'react';

type CardProps = {
  children: ReactNode;
  title?: string;
  icon?: ReactNode;
  large?: boolean;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, title, icon, large = false, className, ...props }, ref) => {
    const classes = clsx('card', large && 'card--large', className);

    return (
      <article ref={ref} className={classes} {...props}>
        {title && (
          <h4 className="card__title">
            {icon}
            {title}
          </h4>
        )}

        {children}
      </article>
    );
  }
);

Card.displayName = 'Card';

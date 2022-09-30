import { MinusCircleIcon } from '@heroicons/react/outline';
import { CheckCircleIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { MouseEvent } from 'react';

type SwitchButtonProps = {
  isSelected: boolean;
  onClick: (e: MouseEvent) => void;
};

export const SwitchButton = ({ isSelected, onClick }: SwitchButtonProps) => {
  const classes = clsx(
    'case-table__switch',
    isSelected && 'case-table__switch--selected'
  );

  const Icon = isSelected ? CheckCircleIcon : MinusCircleIcon;

  return (
    <span onClick={onClick}>
      <Icon className={classes} />
    </span>
  );
};

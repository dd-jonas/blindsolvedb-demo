import { ChevronLeftIcon } from '@heroicons/react/outline';
import { To } from 'react-router-dom';

import { LinkButton } from '#components';

type SetHeaderProps = {
  title: string;
  returnTo: To;
};

export const SetHeader = ({ title, returnTo }: SetHeaderProps) => {
  return (
    <header className="set-header">
      <h1 className="set-header__title">{title}</h1>

      <LinkButton
        to={returnTo}
        variant="ghost"
        small
        icon={<ChevronLeftIcon />}
        className="set-header__return"
      >
        Back
      </LinkButton>
    </header>
  );
};

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  SwitchHorizontalIcon,
} from '@heroicons/react/solid';
import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useSettings } from '#providers';
import { Case, Set } from '#types/api';

type CaseLinksProps = {
  set: Set;
  casus: Case;
};

export const CaseLinks = ({ set, casus }: CaseLinksProps) => {
  const { ls } = useSettings();

  const currentIndex = set.cases.findIndex((c) => c.slug === casus.slug);
  const previousCase = set.cases[currentIndex - 1];
  const nextCase = set.cases[currentIndex + 1];

  const preventNavigation = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    toast.warn(
      `Quick navigation is not supported, as only case ${ls(
        casus.name,
        casus.buffers
      )} and ${ls(
        casus.inverse_name!,
        casus.buffers
      )} are available in this demo.`
    );
  };

  return (
    <div className="case-links">
      <div className="case-links__inverse">
        {casus.inverse_name && (
          <Link to={`/sheets/${set.slug}/${casus.inverse_slug}`}>
            <SwitchHorizontalIcon />
            {ls(casus.inverse_name, 'UFR')}
          </Link>
        )}
      </div>

      <div className="case-links__prev-next">
        {previousCase && (
          <Link
            to={`/sheets/${set.slug}/${previousCase.slug}`}
            onClick={preventNavigation}
          >
            <ChevronLeftIcon />
            {ls(previousCase.name, set.buffers)}
          </Link>
        )}

        {nextCase && (
          <Link
            to={`/sheets/${set.slug}/${nextCase.slug}`}
            onClick={preventNavigation}
          >
            {ls(nextCase.name, set.buffers)}
            <ChevronRightIcon />
          </Link>
        )}
      </div>
    </div>
  );
};

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  SwitchHorizontalIcon,
} from '@heroicons/react/solid';
import { Link } from 'react-router-dom';

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

  return (
    <div className="case-links">
      <div className="case-links__inverse">
        {casus.inverse_name && (
          <Link to={`/sheets/${set.slug}/${casus.inverse_slug}`}>
            <SwitchHorizontalIcon />
            {ls(casus.inverse_name, set.buffers)}
          </Link>
        )}
      </div>

      <div className="case-links__prev-next">
        {previousCase && (
          <Link to={`/sheets/${set.slug}/${previousCase.slug}`}>
            <ChevronLeftIcon />
            {ls(previousCase.name, set.buffers)}
          </Link>
        )}

        {nextCase && (
          <Link to={`/sheets/${set.slug}/${nextCase.slug}`}>
            {ls(nextCase.name, set.buffers)}
            <ChevronRightIcon />
          </Link>
        )}
      </div>
    </div>
  );
};

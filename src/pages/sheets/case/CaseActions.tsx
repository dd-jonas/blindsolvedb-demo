import { useAuth0 } from '@auth0/auth0-react';
import { PlusIcon, ShieldExclamationIcon } from '@heroicons/react/outline';
import { useState } from 'react';

import { Button } from '#components';
import { Roles, rolesKey } from '#config/roles';
import { Case } from '#types/api';

import { CaseActionAdd } from './CaseActionAdd';
import { CaseActionReport } from './CaseActionReport';

type CaseActionsProps = {
  casus: Case;
};

export const CaseActions = ({ casus }: CaseActionsProps) => {
  const [open, setOpen] = useState<'none' | 'add' | 'report'>('none');

  const { user } = useAuth0();

  const roles: string[] | undefined = user?.[rolesKey];

  if (!roles?.includes(Roles.user)) return null;

  return (
    <div className="case-actions">
      <div className="case-actions__toggles">
        <Button
          variant="ghost"
          icon={<PlusIcon />}
          onClick={() => setOpen((prev) => (prev === 'add' ? 'none' : 'add'))}
        >
          Add algorithm
        </Button>

        <Button
          variant="ghost"
          icon={<ShieldExclamationIcon />}
          onClick={() =>
            setOpen((prev) => (prev === 'report' ? 'none' : 'report'))
          }
          danger
        >
          Report
        </Button>
      </div>

      {open === 'add' && (
        <CaseActionAdd
          slug={casus.slug}
          scramble={casus.scramble}
          close={() => setOpen('none')}
        />
      )}

      {open === 'report' && (
        <CaseActionReport
          algorithms={casus.algorithms}
          close={() => setOpen('none')}
        />
      )}
    </div>
  );
};

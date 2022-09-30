import { useLocation, useParams } from 'react-router-dom';

import { Alert, SetHeader, Spinner } from '#components';
import { useSettings } from '#providers';
import { useCase } from '#services/sheets';

import { useSetContext } from '../SetContext';
import { CaseActions } from './CaseActions';
import { CaseLinks } from './CaseLinks';
import { CaseTable } from './CaseTable';

type LocationState = { user?: boolean } | null;

export const Case = () => {
  const set = useSetContext();
  const { caseSlug, setSlug } = useParams();
  const query = useCase(set.slug, caseSlug!);
  const { ls } = useSettings();
  const { state } = useLocation() as { state: LocationState };

  if (query.isLoading || query.isIdle) return <Spinner />;
  if (query.isError) return <Alert danger>{query.error.message}</Alert>;

  const casus = query.data;

  return (
    <section className="case">
      <SetHeader
        title={ls(casus.name, casus.buffers)}
        returnTo={{
          pathname: `/sheets/${setSlug}`,
          search: state?.user ? 'tab=user' : '',
        }}
      />

      <CaseLinks set={set} casus={casus} />

      <CaseTable casus={casus} />

      <CaseActions casus={casus} />
    </section>
  );
};

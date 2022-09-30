import ScrollContainer from 'react-indiana-drag-scroll';
import { Link } from 'react-router-dom';

import { Tabs } from '#components';
import { useTabs } from '#hooks';
import { useSettings } from '#providers';
import { TrainerDetail } from '#types/api';
import { chunk } from '#utils';

type TrainerDetailTableProps = { set: TrainerDetail };

export const TrainerDetailTable = ({ set }: TrainerDetailTableProps) => {
  const { ls } = useSettings();

  const tabs = set.subsets?.map((subset) => ({
    label: ls(subset, set.buffers),
    value: subset,
  }));
  const { activeIndex } = useTabs(tabs ?? [{ value: '' }]);

  const cases = set.cases.map((c) => ({ ...c, name: ls(c.name, set.buffers) }));

  if (!set.subsets) {
    return <TrainerDetailTableView slug={set.slug} cases={cases} />;
  }

  const chunked = chunk(cases, set.size / set.subsets.length);

  return (
    <>
      <Tabs tabs={tabs!} active={activeIndex} replace />
      <TrainerDetailTableView slug={set.slug} cases={chunked[activeIndex]} />
    </>
  );
};

type TrainerDetailTableViewProps = {
  slug: string;
  cases: TrainerDetail['cases'];
};

export const TrainerDetailTableView = ({
  slug,
  cases,
}: TrainerDetailTableViewProps) => {
  return (
    <ScrollContainer
      className="table-container"
      vertical={false}
      hideScrollbars={false}
    >
      <table className="table trainer-detail__table">
        <thead>
          <tr>
            <th>Case</th>
            <th>Algorithm</th>
            <th>Average</th>
          </tr>
        </thead>

        <tbody>
          {cases.map((c, i) => (
            <tr
              key={i}
              className={
                c.algorithm ? undefined : 'trainer-detail__table--not-used'
              }
            >
              <td className="center">
                <Link to={`/sheets/${slug}/${c.slug}`}>{c.name}</Link>
              </td>
              <td>{c.algorithm}</td>
              <td className="center">
                {c.average !== null &&
                  (c.average === 0 ? '...' : c.average.toFixed(2))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </ScrollContainer>
  );
};

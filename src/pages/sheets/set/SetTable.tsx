import clsx from 'clsx';
import { MouseEvent, ReactNode, useState } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useSettings } from '#providers';
import { Set, SetAlgorithm } from '#types/api';
import { Face } from '#types/cube';

import { useSetTableData } from './useSetTableData';

type ContainerProps = { scrollable?: boolean; children: ReactNode };

const Container = ({ scrollable = false, children }: ContainerProps) => {
  return scrollable ? (
    <ScrollContainer
      className="table-container table-container--2d"
      vertical={false}
      hideScrollbars={false}
    >
      {children}
    </ScrollContainer>
  ) : (
    <div className="table-container">{children}</div>
  );
};

type SetTableProps = { set: Set; algorithms: SetAlgorithm[] };

export const SetTable = ({ set, algorithms }: SetTableProps) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { color_scheme, preferences, ls } = useSettings();
  const { headers, cases, is2D } = useSetTableData(set);
  const [activeColumn, setActiveColumn] = useState<number | null>(null);
  const [activeRow, setActiveRow] = useState<number | null>(null);

  const getAlgorithm = (caseId: number) =>
    algorithms.find((algorithm) => algorithm.case_id === caseId)?.algorithm;

  const clickDelegator = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const { slug } = target.dataset;

    const state = { user: searchParams.get('tab') === 'user' };
    slug && navigate(slug, { state });
  };

  const headerColor = (header: string) => {
    const face = (
      header.startsWith('[')
        ? header.length === 5
          ? header[2] // Corner twists (e.g. [BUL])
          : header[1] // Edge flips (e.g. [UB])
        : header[0]
    ) as Face;

    return preferences.colorTableHeaders
      ? `color color-${color_scheme[face]}`
      : undefined;
  };

  const highlightColumn = (i: number) => () => {
    if (activeColumn === i) {
      setActiveColumn(null);
    } else {
      setActiveColumn(i);
    }
  };

  const highlightRow = (i: number) => () => {
    if (activeRow === i) {
      setActiveRow(null);
    } else {
      setActiveRow(i);
    }
  };

  return (
    <Container scrollable={is2D}>
      <table className="table set-table">
        {is2D && (
          <thead>
            <tr>
              <th></th>
              {headers[0].map((header, i) => (
                <th
                  key={i}
                  className={headerColor(header)}
                  onClick={highlightColumn(i)}
                >
                  {ls(header, set.buffers)}
                </th>
              ))}
            </tr>
          </thead>
        )}

        <tbody onClick={clickDelegator}>
          {is2D
            ? cases.map((row, i) => (
                <tr key={i}>
                  <th
                    className={headerColor(headers[1][i])}
                    onClick={highlightRow(i)}
                  >
                    {ls(headers[1][i], set.buffers)}
                  </th>
                  {row.map((casus, j) => (
                    <td
                      key={j}
                      className={clsx(
                        !casus && 'empty',
                        activeRow === i && 'highlight',
                        activeColumn === j && 'highlight',
                        activeRow === i && activeColumn === j && 'highlight-x2'
                      )}
                      data-slug={casus && casus.slug}
                    >
                      {casus && getAlgorithm(casus.id)}
                    </td>
                  ))}
                </tr>
              ))
            : cases.map((casus, i) => (
                <tr key={i}>
                  <th className={headerColor(headers[i])}>
                    {ls(headers[i], set.buffers)}
                  </th>
                  <td data-slug={casus.slug}>
                    {casus && getAlgorithm(casus.id)}
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </Container>
  );
};

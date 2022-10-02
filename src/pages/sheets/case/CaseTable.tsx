import { DuplicateIcon } from '@heroicons/react/outline';
import { MouseEvent, ReactText, useRef } from 'react';
import { toast } from 'react-toastify';

import { useSettings } from '#providers';
import { Case } from '#types/api';
import { copyToClipboard } from '#utils';

import { CaseTableColumnAdmin } from './CaseTableColumnAdmin';
import { CaseTableColumnUser } from './CaseTableColumnUser';

type CaseTableProps = {
  casus: Case;
};

export const CaseTable = ({ casus }: CaseTableProps) => {
  const { preferences } = useSettings();
  const toastId = useRef<ReactText | null>(null);

  const showActions = preferences.showCaseActions;

  const copyAlgorithm = async (e: MouseEvent<HTMLTableCellElement>) => {
    if (toastId.current) toast.dismiss(toastId.current);

    const algorithm = e.currentTarget.innerText;

    await copyToClipboard(algorithm, {
      onSuccess: () => {
        toastId.current = toast.success('Copied to clipboard', {
          autoClose: 2500,
        });
      },
      onFailed: () => {
        toastId.current = toast.error('Failed to copy');
      },
      onNotSupported: () => {
        toastId.current = toast.warn('Clipboard not supported in your browser');
      },
    });
  };

  const columns: string[] = [
    'Algorithm',
    'Use',
    'Users',
    showActions && 'Actions',
  ].filter(Boolean) as string[];

  return (
    <div className="table-container">
      <table className="table case-table">
        <thead>
          <tr>
            {columns.map((column, i) => (
              <th key={i}>{column}</th>
            ))}
          </tr>
        </thead>

        {casus.algorithms.map((algorithm) => (
          <tbody key={algorithm.id}>
            {algorithm.shapes.map((shape, i) => (
              <tr key={shape.id}>
                <td className="case-table__algorithm" onClick={copyAlgorithm}>
                  <div>
                    {shape.text}
                    {<DuplicateIcon />}
                  </div>
                </td>

                <CaseTableColumnUser slug={casus.slug} shapeId={shape.id} />

                {i === 0 && (
                  <td rowSpan={algorithm.shapes.length}>{algorithm.users}</td>
                )}

                {showActions && <CaseTableColumnAdmin shapeId={shape.id} />}
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    </div>
  );
};
